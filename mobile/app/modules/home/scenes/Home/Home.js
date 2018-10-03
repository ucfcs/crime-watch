import React from 'react';
var { View, ScrollView, Alert, Text, Platform, TouchableOpacity, Image } = require('react-native');
import bindActionCreators from 'redux';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { iosStyles, androidStyles } from "./styles";

import store from '../../../../redux/store';

import { actions as auth, theme } from "../../../auth/index"
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';

import { actions as home } from '../../index';
const { getReports } = home;

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
            reports: new Array()
        };
     
        this.getReports = this.getReports.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    // The important part. ComponentDidMount happens ONCE when the PAGE is initially loaded. There is where you tap into the store to retrieve the current state. 
    // Update this.state by using the setState method on each unique field that you'll need for the page
    //
    // NOTE ** We wrap the state stuff inside this.props.navigation.addListener(). It's an asynchronous function that actively listens for a page navigation event.
    // It's the only method I could think of that will allow the state to be updated after going back a page.
    componentDidMount = async () => {
        this.props.navigation.addListener('willFocus', () =>{

            // Here is a list of all USER REPORTS. Please use this information 
            // and display it on the page.
            //var reports = home.getReport();
            this.getReports();
            home.setLocation();
            
            const state = store.getState().authReducer;

            var uid = state.uid;
            var username = state.username;
            var gender = state.gender;
            var phone = state.phone;
            var email = state.email;
            var reports = state.reports;
   
            this.setState({ 'username': username, 'gender': gender, 'uid': uid, 'phone': phone, 'email': email, 'reports': reports});
        });
    }

    // When the component receives new properties i.e. the gender was changed way back up in the root level of the app (because we linked our component to it),
    // a rerender will happen via this.setState(). Place all of the variables that will be updated in here.
    //
    componentWillReceiveProps(nextProps) {
        if (nextProps.reports != this.props.reports)
        {
            console.log("Detected prop change, so rerendering the state");
            this.setState({ reports: nextProps.reports});  
        }
    }

    getReports(value) {
        this.setState({reports: value});
        this.props.getReports();
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

        const reportTableHeaders = ['', 'Type', 'Time', 'Map'];
        const reportTableData = [[]];

        console.log(this.state.reports);
        // can now grab location data
        for (var report in reports)
        {
            reportTableData.push('', this.state.reports.type, this.state.reports.time, '');
        }
    
        reportMapButton = (reportIndex) => (
            <TouchableOpacity onPress={() => {
                    Actions.Map({
                        longitude: this.state.reports[reportIndex].longitude,
                        latitude: this.state.reports[reportIndex].latitude,
                    });
                }}>
            
            
                <Image style={styles.reportMapButton}
                        source={require('../../../../assets/images/gps.png')}>
                </Image>
            
            </TouchableOpacity>
        );
    
       
        
        return (
            <ScrollView style={styles.container}>

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

                   <TouchableOpacity onPress={Actions.Settings} style={styles.navButton3}>
                        <Image style={styles.navButtonContent}
                            source={require('../../../../assets/images/placeholder.png')}>
                        </Image>
                        <Text>101</Text>
                   </TouchableOpacity>
                </View>

                <View style={styles.reportsContainer}>
            
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
            
            </ScrollView>
        );
    }
}

// Not used until later
const mapStateToProps = (state) => {
    return{
        reports: state.authReducer.reports
    }
}

const mapDispatchToProps = {
    getReports
  }
    

export default connect(mapStateToProps, mapDispatchToProps)(Home);