import React from 'react';
var { View, StyleSheet, Alert, Text, ScrollView, Platform } = require('react-native');

import {SettingsDividerShort, SettingsDividerLong, SettingsEditText, SettingsCategoryHeader, SettingsSwitch, SettingsPicker} from 'react-native-settings-components';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
import action from '../../actions'
const { signOut } = auth;

const { color } = theme;
import AsyncStorage from "react-native";


class Settings extends React.Component {
    constructor(){
        super();
        this.state = { 
            username: '',
            allowedPushNotifications: false,
            gender: '',
        };
    }

    async componentWillMount()
    {
        const user = JSON.parse(await AsyncStorage.getItem("user"));
        this.setState({
            user,
            ready: true
        })
    }

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
                    console.log('gender:', value);
                    this.setState({
                        gender: value
                    });
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
    switchDisabled: (Platform.OS === 'android') ? 'red' : null,
    switchOnTintColor: (Platform.OS === 'android') ? 'black' : null,
    blueGem: 'blue',
  };

  export default connect(null, {})(Settings);