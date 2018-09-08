import React from 'react';
var { View, StyleSheet, Alert, Text, ScrollView, Platform } = require('react-native');

import {SettingsDividerShort, SettingsDividerLong, SettingsEditText, SettingsCategoryHeader, SettingsSwitch, SettingsPicker} from 'react-native-settings-components';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';


import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
import { actions as home } from "../../../home/index"
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

        this.onSignOut = this.onSignOut.bind(this);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    // alternative method
    componentDidMount = async () => {
        console.log("Currently here");
        AsyncStorage.getItem('user').then(response => {
            var uid = JSON.parse(response).uid;
            var user = JSON.parse(response).username;
            var gender = JSON.parse(response).gender;
            var phone = JSON.parse(response).phone;

            this.setState({ 'username': user, 'gender': gender, 'uid': uid, 'phone': phone});
        }).done();
    }
  
    render() {
        return (
        <ScrollView style={{flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.iosSettingsBackground : colors.white}}>
     
            <SettingsCategoryHeader title={'My Account'} textStyle={(Platform.OS === 'android') ? {color: colors.black} : null}/>
     
            <SettingsDividerLong android={false}/>
            <SettingsDividerShort ios={true}/>

            <SettingsEditText
                disabled='true'
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

            <SettingsEditText
                disabled='true'
                title="Phone"
                dialogDescription={'Change your phone number.'}
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
                value={this.state.phone}
                dialogAndroidProps={{
                    widgetColor: colors.black,
                    positiveColor: colors.black,
                    negativeColor: colors.black,
                }}
            />
     
            
     
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
                    home.changeGender(this.state.uid, value);
                   // actions.changeGender(value);

                }}
                value={this.state.gender}
                styleModalButtonsText={{color: colors.black}}
            />
            
            <SettingsDividerShort/>
    
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
     
            <Button
                    raised
                    //borderRadius={20}
                    title={'LOG OUT'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>

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

  export default connect(null, { signOut })(Settings);