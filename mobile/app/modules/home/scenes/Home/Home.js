import React from 'react';
var { View, ScrollView, Alert, Text, Platform, TouchableOpacity } = require('react-native');
import bindActionCreators from 'redux';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { iosStyles, androidStyles } from "./styles";

import store from '../../../../redux/store';

import { actions as auth, theme } from "../../../auth/index"
import { Table, Row, Rows } from 'react-native-table-component';

import { getReports } from '../../actions';

const { color } = theme;

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
            
            const state = store.getState().authReducer;
            console.log("STATE:");
            console.log(state);
            // var reports = getReports(state.uid);
            //console.log(state);
            // console.log(" REPORT'S");
            // console.log(reports);

            var uid = state.uid;
            var username = state.username;
            var gender = state.gender;
            var phone = state.phone;
            var email = state.email;
            var types = [];
            var reports = state.reports;
            //getReports(uid);
            console.log("email " + email);
            console.log("reports " + reports[0].details); 
            // getReports(uid).then(reports => {
            //     console.log("I'm here");
            //     reports.array.forEach(element => {
            //         types.push(element.val().type);
            //     });
            // })
   
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

    _alertIndex(index) {
        Alert.alert("This button was pressed");
    }

    render() {
        const styles = (Platform.OS === 'ios')? iosStyles : androidStyles;
        const state = this.state;
        const types = [];
        state.reports.forEach((report) => {
            types.push(report.type);
            console.log(report.type);
        });
        // const reports = state.reports;
        // console.log("Here are theose damn reports " + reports);
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>button</Text>
                </View>
            </TouchableOpacity>
        );

        return (
            <ScrollView style={styles.container}>

                <View style={styles.navView}>
                    <Button
                        raised
                        title={'Settings'}
                        containerViewStyle={[styles.containerView]}
                        buttonStyle={[styles.button]}
                        onPress={Actions.Settings}/>
                        
                </View>

                <View style={styles.userView}>

                    <Text>Welcome, {state.username}!</Text>
                    <Text>Gender, {state.gender}!</Text>

                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={styles.tableContainer}>
                        <Row data={["Report Number", "Type"]} style={styles.head}/>
                        <Row data={types} style={styles.head}/>
                        {/* <Rows data={[state.reports]} style={styles.text}/> */}
                    </Table>

                    <View style={styles.navView}>
                    <Button
                        raised
                        title={'Reports Map'}
                        containerViewStyle={[styles.containerView]}
                        buttonStyle={[styles.button]}
                        onPress={Actions.Map}/>
                        
                    </View>

                    {/* <TouchableOpacity onPress={Actions.Map}>
                        <Text>PRESS HERE TO SEE REPORTS MAP</Text>
                    </TouchableOpacity> */}
                    
                </View>

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