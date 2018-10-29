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
const { setLocation, getReports } = home;
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
        };

        this.onGetReports = this.onGetReports.bind(this);
        this.onSetLocation = this.onSetLocation.bind(this);
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
        if (deviceID == "")
            reportArray = [];

        this.setState({ 'username': username, 'gender': gender, 'uid': uid, 'phone': phone, 'email': email, 'reports': reportArray});
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
    }

    onGetReports() {
        var reports = getReports();
    }

    onSetLocation(deviceID) {
        this.props.setLocation(deviceID);
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
        console.log("HOME RENDER WAS CALLED");
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

            if (reports[i].type == "Vehicle")
                percentageVehicle++;
            else if (reports[i].type == "Pedestrian")
                percentagePedestrian++;
            else if (reports[i].type == "Construction")
                percentageConstruction++;
            else if (reports[i].type == "Traffic")
                percentageTraffic++;
            else if (reports[i].type == "Animal")
                percentageAnimal++;
        }

        if (reports.length > 0)
        {
            percentageVehicle = percentageVehicle/reports.length;
            percentagePedestrian = percentagePedestrian/reports.length;
            percentageTraffic = percentageTraffic/reports.length;
            percentageAnimal = percentageAnimal/reports.length;
            percentageConstruction = percentageConstruction/reports.length;
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
        
                <Swiper style={styles.reportsContainer} autoplay={false}>

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

                   <TouchableOpacity onPress={() => {
                        Actions.Map({
                            longitude: undefined,
                            latitude: undefined,
                            reportLocs: reportLocations
                        });
                    }} style={styles.navButton2}>
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