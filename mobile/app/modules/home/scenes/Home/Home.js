import React from 'react';
var { View, ScrollView, Alert, Text, Platform, TouchableOpacity, Image } = require('react-native');

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { iosStyles, androidStyles } from "./styles";

import store from '../../../../redux/store';

import { actions as auth, theme } from "../../../auth/index"
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { VictoryPie, VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import { actions as home } from '../../index';
import Swiper from 'react-native-swiper';

const { color } = theme;

Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);

class Home extends React.Component {
    constructor(props){
        super(props);

        // Set some initial state (variables that you need to display somewhere on this screen)
        // I don't need it all for this home page but why not 
        this.state = { 
            uid: '',
            username: '',
            gender: '',
            phone: '',
            email: '',
            reports: []
        };

        //this.getReports = this.getReports.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    // The important part. ComponentDidMount happens ONCE when the PAGE is initially loaded. There is where you tap into the store to retrieve the current state. 
    // Update this.state by using the setState method on each unique field that you'll need for the page
    //
    // NOTE ** We wrap the state stuff inside this.props.navigation.addListener(). It's an asynchronous function that actively listens for a page navigation event.
    // It's the only method I could think of that will allow the state to be updated after going back a page.
    componentDidMount = async () => {
        // Here is a list of all USER REPORTS. Please use this information 
        // and display it on the page.
        const state = store.getState().authReducer;
        console.log("STATE");
        console.log(state);
        var uid = state.uid;
        var username = state.username;
        var gender = state.gender;
        var phone = state.phone;
        var email = state.email;
        var reports = state.reports;
        var deviceID = state.deviceID;

        this.setState({ 'username': username, 'gender': gender, 'uid': uid, 'phone': phone, 'email': email, 'reports': reports});

        home.setLocation(uid, deviceID);
        //home.getReport(deviceID);
    }

    // When the component receives new properties i.e. the gender was changed way back up in the root level of the app (because we linked our component to it),
    // a rerender will happen via this.setState(). Place all of the variables that will be updated in here.
    //
    componentWillReceiveProps(nextProps) {
        if (nextProps.gender != this.props.gender)
        {
            console.log("Detected prop change, so rerendering the state");
            this.setState({ gender: nextProps.gender });  
        }
        if(nextProps.reports != this.props.reports)
        {
            console.log("Detected prop change, so rerendering the state");
            this.setState({ reports: nextProps.reports });
        }
    }

    onSwipe(index) {
        console.log("You Swipped to index " + index);
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    render() {
        const styles = (Platform.OS === 'ios')? iosStyles : androidStyles;
        const reports = this.state.reports;
        console.log("REPORTS JUST BEFORE RENDER ");
        console.log(reports);

        var percentageVehicle = 0;
        var percentagePedestrian = 0;
        var percentageOther = 0;

        const reportTableHeaders = ['Time', 'Type', 'Description', 'Map'];
        const reportTableData = [[]];
        const reportLocations = [[]];

        for (let i = 0; i < reports.length; i++)
        {
            reportTableData[i] = [reports[i][3], reports[i][4], reports[i][0], ''];
            reportLocations[i] = [reports[i][1], reports[i][2]];
            if (reports[i][4] == "Vehicle")
                percentageVehicle++;
            else if (reports[i][4] == "Pedestrian")
                percentagePedestrian++;
            else
                percentageOther++;
        }

        percentageVehicle = percentageVehicle/reports.length;
        percentagePedestrian = percentagePedestrian/reports.length;
        percentageOther = percentageOther/reports.length;
        var pieChartData = [
            { x: "Vehicle", y: percentageVehicle },
            { x: "Pedestrian", y: percentagePedestrian },
            { x: "Other", y: percentageOther }
        ]
        var pieChartColors = [color.green, color.orange, color.light_blue];
        if (percentageVehicle == 0)
        {
            pieChartData.splice(0, 1);
            pieChartColors.splice(0, 1);
        }
        if (percentagePedestrian == 0)
        {
            pieChartData.splice(1, 1);
            pieChartColors.splice(1, 1);
        }
        if (percentageOther == 0)
        {
            pieChartData.splice(2, 1);
            pieChartColors.splice(2, 1);
        }
        console.log("Pie Chart Data:");
        console.log(pieChartData);
        console.log("Pie Chart Colors:");
        console.log(pieChartColors);
        
        const reportMapButton = (reportIndex) => (
            <TouchableOpacity onPress={() => {
                    Actions.Map({
                        longitude: reports[reportIndex][2],
                        latitude: reports[reportIndex][1],
                        reportLocs: reportLocations
                    });
                }}>
                <View style={styles.button}>
                    <Text style={styles.reportMapButton}>MAP</Text>
                </View>
            </TouchableOpacity>
        );

        
        return (
            <View style={styles.container}>
        
                <Swiper style={styles.reportsContainer} autoplay={false} onIndexChanged={this.onSwipe}>

                    <View>
                        <View style={styles.spacer}><Text style={styles.spacerText}>My Reports</Text></View>
                        <Table borderStyle={{borderColor: 'transparent'}}>
                            <Row data={reportTableHeaders} style={styles.reportsHeader} textStyle={styles.reportsText}/>
                            {
                                reportTableData.map((rowData, index) => (
                                    <TableWrapper key={index} style={styles.reportsRow}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 3 ? reportMapButton(index): cellData}/>
                                        ))
                                    }
                                    </TableWrapper>
                                ))
                            }
                        </Table>
                    </View>

                    <View>
                        <View style={styles.spacer}><Text style={styles.spacerText}>Pie Chart</Text></View>
                        <VictoryPie
                        padding={100}
                        colorScale={pieChartColors}
                            data={pieChartData}
                        />
                    </View>

                    <View>
                        <View style={styles.spacer}><Text style={styles.spacerText}>Line Chart</Text></View>
                        <VictoryChart
                        theme={VictoryTheme.material}
                        >
                        <VictoryBar
                            padding={100}
                            style={{ data: { fill: "#c43a31" } }}
                            alignment="start"
                            data={[
                                { x: 'Jan', y: 1, y0: 0 },
                                { x: 'Feb', y: 2, y0: 0 },
                                { x: 'Mar', y: 3, y0: 0 },
                                { x: 'Apr', y: 4, y0: 0 },
                                { x: 'May', y: 5, y0: 0 }
                            ]}
                        />
                        </VictoryChart>

                    </View>
                </Swiper>

                <View style={styles.navView}>
                    <TouchableOpacity onPress={Actions.Settings} style={styles.navButton1}>
                        <Image style={styles.navButtonContent}
                            source={require('../../../../assets/images/settings.png')}>
                        </Image>
                        <Text>Settings</Text>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={Actions.Settings} style={styles.navButton2}>
                        <Image style={styles.navButtonContent}
                            source={require('../../../../assets/images/user.png')}>
                        </Image>
                        <Text>Henry</Text>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={() => {
                        Actions.Map({
                            longitude: undefined,
                            latitude: undefined,
                            reportLocs: reportLocations
                        });
                    }} style={styles.navButton3}>
                        <Image style={styles.navButtonContent}
                            source={require('../../../../assets/images/placeholder.png')}>
                        </Image>
                        <Text>Report Map</Text>
                   </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        //'reports': state.authReducer.reports
    }
}

/*
const mapDispatchToProps = {
    getReports
  }
   */ 

export default connect(mapStateToProps, {})(Home);