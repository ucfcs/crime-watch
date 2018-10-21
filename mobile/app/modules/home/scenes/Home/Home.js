import React from 'react';
var { View, ScrollView, Alert, Text, Platform, TouchableOpacity, Image } = require('react-native');

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { iosStyles, androidStyles } from "./styles";

import store from '../../../../redux/store';

import { actions as auth, theme } from "../../../auth/index"
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { VictoryPie, VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
import { actions as home } from '../../index';
import Swiper from 'react-native-swiper';
const { setLocation } = home;
const { color } = theme;

Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);

class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            uid: '',
            username: '',
            gender: '',
            phone: '',
            email: '',
            reports: []
        };

        this.onSetLocation = this.onSetLocation.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

   componentDidMount = async () => {

        const state = store.getState().authReducer;

        var uid = state.uid;
        var username = state.username;
        var gender = state.gender;
        var phone = state.phone;
        var email = state.email;
        var reports = state.reports;
        var deviceID = state.deviceID;
        var reportArray = Object.values(reports)

        this.setState({ 'username': username, 'gender': gender, 'uid': uid, 'phone': phone, 'email': email, 'reports': reportArray});

        this.onSetLocation(uid, deviceID);
    }

    componentWillReceiveProps(nextProps) {
        console.log("Detected prop change");
        if (nextProps.gender != this.props.gender)
        {
            this.setState({ gender: nextProps.gender });  
        }
        if(nextProps.reports != this.props.reports)
        {
            var reportArray = Object.values(nextProps.reports)

            this.setState({ reports: reportArray });
        }
    }

    onSetLocation(uid, deviceID) {
        this.props.setLocation(uid, deviceID);
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

        var percentageVehicle = 0;
        var percentagePedestrian = 0;
        var percentageAnimal = 0;
        var percentageOther = 0;
        var percentageConstruction = 0;
        const reportTableHeaders = ['Time', 'Type', 'Description', 'Map'];
        const reportTableData = [[]];
        const reportLocations = [[]];

        for (var i = 0; i < reports.length; i++)
        {
            reportTableData[i] = [reports[i].time, reports[i].type, reports[i].description, ''];
            reportLocations[i] = [reports[i].latitude, reports[i].longitude];

            if (reports[i].type == "Vehicle")
                percentageVehicle++;
            else if (reports[i].type == "Pedestrian")
                percentagePedestrian++;
            else 
                percentageOther++;
        }

        percentageVehicle = percentageVehicle/reports.length;
        percentagePedestrian = percentagePedestrian/reports.length;
        percentageOther = percentageOther/reports.length;
        percentageAnimal = percentageAnimal/reports.length;
        percentageConstruction = percentageConstruction/reports.length;

        var pieChartData = [
            { x: "Vehicle", y: percentageVehicle },
            { x: "Pedestrian", y: percentagePedestrian },
            { x: "Other", y: percentageOther },
            { x: "Animal", y: percentageAnimal },
            { x: "Construction", y: percentageConstruction }
        ]
        var pieChartColors = [color.green, color.orange, color.light_blue, color.navy, color.grey];
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
        if (percentageAnimal == 0)
        {
            pieChartData.splice(3, 1);
            pieChartColors.splice(3, 1);
        }
        if (percentageConstruction == 0)
        {
            pieChartData.splice(4, 1);
            pieChartColors.splice(4, 1);
        }
        
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

                    <ScrollView>
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
                    </ScrollView>

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
        'reports': state.authReducer.reports
    }
}


const mapDispatchToProps = {
    setLocation
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);