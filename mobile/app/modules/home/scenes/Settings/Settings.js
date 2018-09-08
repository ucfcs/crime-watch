import React from 'react';
var { View, StyleSheet, Alert, Text, ScrollView, Platform } = require('react-native');

import {SettingsDividerShort, SettingsDividerLong, SettingsEditText, SettingsCategoryHeader, SettingsSwitch, SettingsPicker} from 'react-native-settings-components';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../home/index"
//import action from '../../actions'
const { signOut } = auth;

const { color } = theme;
import { AsyncStorage } from "react-native";


class Settings extends React.Component {
    constructor(){
        super();
        this.state = { 
            uid: '',
            username: '',
            allowedPushNotifications: false,
            gender: '',
        };
    }
    // alternative method
    componentDidMount = async () => {
        console.log("Currently here");
        AsyncStorage.getItem('user').then(response => {
            var uid = JSON.parse(response).uid;
            var user = JSON.parse(response).username;
            var gender = JSON.parse(response).gender;

            this.setState({ 'username': user, 'gender': gender, 'uid': uid });
        }).done();
    }
    
    /*
    async componentWillMount()
    {
        console.log("Currently here");
        AsyncStorage.getItem('user').then(response => {
            var user = JSON.parse(response).username;
            this.setState({ 'user': user });
        }).done();
    }
    */

    render() {
        return (
        <ScrollView style={{flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.iosSettingsBackground : colors.white}}>
     
            <SettingsCategoryHeader title={'My Account'} textStyle={(Platform.OS === 'android') ? {color: colors.black} : null}/>
     
            <SettingsDividerLong android={false}/>
     
            <SettingsEditText
                title="Username"
                dialogDescription={'Enter your username.'}
                valuePlaceholder="..."
                positiveButtonTitle={'Continue'}
                negativeButtonTitle={'Cancel'}
                buttonRightTitle={'Save'}
                onSaveValue={(value) => {
                    console.log('username:', value);
                    this.setState({
                        username: value
                    });
                }}
                value={this.state.username}
                dialogAndroidProps={{
                    widgetColor: colors.black,
                    positiveColor: colors.black,
                    negativeColor: colors.black,
                }}
            />
     
            <SettingsDividerShort/>
     
            <SettingsPicker
                title="Gender"
                dialogDescription={'Choose your gender.'}
                possibleValues={[
                    {label: '...', value: ''},
                    {label: 'male', value: 'male'},
                    {label: 'female', value: 'female'},
                    {label: 'other', value: 'other'}
                ]}
                positiveButtonTitle={'Continue'}
                negativeButtonTitle={'Cancel'}
                buttonRightTitle={'Save'}
                onSaveValue={value => {
                    
                    this.setState({
                        gender: value
                    });

                    // Call an Action to save the new information into firebase
                    auth.changeGender(this.state.uid, value);
                   // actions.changeGender(value);

                }}
                value={this.state.gender}
                styleModalButtonsText={{color: colors.black}}
            />
            
    
            <SettingsSwitch
                title={'Allow Push Notifications'}
                onSaveValue={(value) => {
                    console.log('allow push notifications:', value);
                    this.setState({
                        allowPushNotifications: value
                    });
                }}
                value={this.state.allowPushNotifications}
                thumbTintColor={(this.state.allowPushNotifications) ? colors.switchEnabled : colors.switchDisabled}
            />
     
     
          </ScrollView>
        );
        }
}

const colors = {
    iosSettingsBackground: 'blue',
    white: 'white',
    monza: 'red',
    switchEnabled: (Platform.OS === 'android') ? 'red' : null,
    switchDisabled: (Platform.OS === 'android') ? 'gray' : null,
    switchOnTintColor: (Platform.OS === 'android') ? 'black' : null,
    blueGem: 'blue',
  };

  export default connect(null, {})(Settings);