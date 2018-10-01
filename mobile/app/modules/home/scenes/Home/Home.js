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
            var reports = home.getReport();
 
            const state = store.getState().authReducer;

            console.log(state);

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
        if (nextProps.gender != this.props.gender)
        {
            console.log("Detected prop change, so rerendering the state");
            this.setState({ gender: nextProps.gender });  
        }
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
        const reportTableHeaders = ['Index', 'Type', 'Time', 'Map'];
        const reportTableData = [[]];
        for (let i = 0; i < reports.length; i++)
        {
            reportTableData[i] = [i, reports[i].type, reports[i].time, ''];
        }
        const reportMapButton = (reportIndex) => (
            <TouchableOpacity onPress={() => {
                    Actions.Map({
                        longitude: reports[reportIndex].longitude,
                        latitude: reports[reportIndex].latitude,
                    });
                }}>
                <View style={styles.button}>
                    <Text style={styles.reportMapButton}>MAP</Text>
                </View>
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
                        <Text>53</Text>
                   </TouchableOpacity>
                </View>

                <View style={styles.spacer}>
                    <Text style={styles.reportListTitle}>Report List</Text>
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

                <TouchableOpacity onPress={Actions.Map}>
                        <Text>PRESS HERE TO SEE REPORTS MAP</Text>
                    </TouchableOpacity>

            </ScrollView>
        );
    }
}

// Not used until later
const mapStateToProps = (state) => {
    return{
        username: state.username,
        gender: state.gender
    }
}


export default connect(null, {})(Home);