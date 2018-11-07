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
const { setLocation, getReports, searchListener } = home;
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
            reports: [],
            allReports: []
        };

        this.onGetReports = this.onGetReports.bind(this);
        this.onSetLocation = this.onSetLocation.bind(this);
        this.onSearchListener = this.onSearchListener.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

   componentDidMount = async () => {

        const state = store.getState().authReducer;
        //console.log("HOME STATE");
        
        var uid = state.uid;
        var username = state.username;
        var gender = state.gender;
        var phone = state.phone;
        var email = state.email;
        var reports = state.reports;
        var deviceID = state.deviceID;
        var reportArray = Object.values(reports);
        var allReports = state.allReports
        
        if (deviceID == "")
            reportArray = [];

        this.setState({ 'username': username, 'gender': gender, 'uid': uid, 'phone': phone, 'email': email, 'reports': reportArray, 'allReports': allReports});
        this.onGetReports();
        this.onSetLocation(deviceID);
        home.searchListener(deviceID);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gender != this.props.gender)
        {
            this.setState({ gender: nextProps.gender });  
        }
        if(nextProps.reports != this.props.reports)
        {
            var reportArray = Object.values(nextProps.reports)

            this.setState({ reports: reportArray });
        }
        if(nextProps.allReports != this.props.allReports)
        {
            this.setState({ allReports: nextProps.allReports });
        }
    }

    onGetReports() {
        //var reports = getReports();
        //this.setState({'allReports': reports});
        this.props.getReports();
    }

    onSetLocation(deviceID) {
        this.props.setLocation(deviceID);
    }

    onSearchListener(deviceID)
    {
        searchListener(deviceID);
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
        const allReports = this.state.allReports;
 
        var percentageVehicle = 0;
        var percentagePedestrian = 0;
        var percentageAnimal = 0;
        var percentageTraffic = 0;
        var percentageConstruction = 0;
        const reportTableHeaders = ['', 'Description', 'Date'];
        const reportTableData = [[]];
        const reportLocations = [[]];

        for (var i = 0; i < reports.length; i++)
        {
            reportTableData[i] = [<Image
                style={{width: 30, height: 30}}
                source={require('../../../../assets/images/gps.png')}
            />,
            reports[i].type + ' / \n' +  reports[i].description, reports[i].date + '\n' + reports[i].time ];
            reportLocations[i] = [reports[i].latitude, reports[i].longitude];
        }

        for (var i = 0; i < allReports.length; i++)
        {
            if (allReports[i].type == "Vehicle")
                percentageVehicle++;
            else if (allReports[i].type == "Pedestrian")
                percentagePedestrian++;
            else if (allReports[i].type == "Construction")
                percentageConstruction++;
            else if (allReports[i].type == "Traffic")
                percentageTraffic++;
            else if (allReports[i].type == "Animal")
                percentageAnimal++;
        }

        if (allReports.length > 0)
        {
            percentageVehicle = percentageVehicle/allReports.length;
            percentagePedestrian = percentagePedestrian/allReports.length;
            percentageTraffic = percentageTraffic/allReports.length;
            percentageAnimal = percentageAnimal/allReports.length;
            percentageConstruction = percentageConstruction/allReports.length;
        }

        var pieChartData = [];
        var pieChartColors= [];
        if (percentageVehicle != 0)
        {
            pieChartData.push({ x: "Vehicle", y: percentageVehicle });
            pieChartColors.push(color.green);
        }
        if (percentagePedestrian != 0)
        {
            pieChartData.push({ x: "Pedestrian", y: percentagePedestrian });
            pieChartColors.push(color.orange);
        }
        if (percentageTraffic != 0)
        {
            pieChartData.push({ x: "Traffic", y: percentageTraffic });
            pieChartColors.push(color.light_black);
        }
        if (percentageAnimal != 0)
        {
            pieChartData.push({ x: "Animal", y: percentageAnimal });
            pieChartColors.push(color.navy);
        }
        if (percentageConstruction != 0)
        {
            pieChartData.push({ x: "Construction", y: percentageConstruction });
            pieChartColors.push(color.red);
        }

        return (
            <View style={styles.container}>
        
                <Swiper style={styles.reportsContainer} index={0} autoplay={false}>

                    <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                        <View style={styles.spacer}><Text style={styles.spacerText}>My Reports</Text></View>
                        <Table borderStyle={{borderColor: 'transparent'}}>
                        
                                <Row data={reportTableHeaders} style={styles.reportsHeader} textStyle={styles.reportsText}/>
                                {
                                    reportTableData.map((rowData, index) => (
                                        <TouchableOpacity key={index} onPress={() => {
                                                Actions.Map({
                                                    longitude: reports[index].longitude,
                                                    latitude: reports[index].latitude,
                                                    reportLocs: reportLocations
                                                });
                                            }}>
                                            <TableWrapper key={index} style={styles.reportsRow}>
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell borderStyle={{borderColor: 'transparent'}} key={cellIndex} data={cellData}/>
                                                ))
                                            }
                                            </TableWrapper>
                                        </TouchableOpacity>
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

                    {/* <View>
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

                    </View> */}
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
                        <Text>All Reports</Text>
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
        'reports': state.authReducer.reports,
        'allReports': state.authReducer.allReports
    }
}


const mapDispatchToProps = {
    getReports,
    setLocation
  }

export default connect(mapStateToProps, mapDispatchToProps)(Home);