import React from 'react';
var { View, StyleSheet, Alert, Text, ScrollView, Platform } = require('react-native');

import {SettingsDividerShort, SettingsDividerLong, SettingsEditText, SettingsCategoryHeader, SettingsSwitch, SettingsPicker} from 'react-native-settings-components';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import store from '../../../../redux/store';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
import { actions as home } from "../../../home/index"
//import action from '../../actions'
const { signOut } = auth;
const { changePhone, changeGender } = home;

const { color } = theme;

class Settings extends React.Component {
    constructor(props){
        super(props);
        
        this.state = { 
            uid: '',
            username: '',
            allowedPushNotifications: false,
            gender: '',
            email: ''
        };
        console.log(props);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onPhoneChange(value) {
        this.setState({phone: value});
        this.props.changePhone(this.state.uid, value);
    }

    onGenderChange(value) {
        this.setState({gender: value});
        this.props.changeGender(this.state.uid, value);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {s
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    // alternative method
    componentDidMount = async () => {

        const state = store.getState().authReducer.user;
        console.log(state);
        var uid = state.uid;
        var username = state.username;
    
        // check for prop status before implementing state
        var gender = (this.props.gender == undefined)? state.gender: this.props.gender;
        var phone = state.phone;
        var email = state.email;
        this.setState({ 'username': username, 'gender': gender, 'uid': uid, 'phone': phone, 'email': email}).done();
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.gender != this.props.gender)
        {
            //console.log("Detected prop change, so rerendering the state");
            this.setState({ gender: nextProps.gender });  
        }
    }

    render() {
        return (
        <ScrollView style={{flex: 1, backgroundColor: (Platform.OS === 'ios') ? colors.iosSettingsBackground : colors.white}}>
     
            <SettingsCategoryHeader title={'My Account ' + this.state.gender } textStyle={(Platform.OS === 'android') ? {color: colors.black} : null}/>
     
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
                value={this.state.username}
                dialogAndroidProps={{
                    widgetColor: colors.black,
                    positiveColor: colors.black,
                    negativeColor: colors.black,
                }}
            />
     
            <SettingsEditText
                disabled='true'
                title="Email"
                dialogDescription={'Change your Email.'}
                valuePlaceholder="..."
                positiveButtonTitle={'Continue'}
                negativeButtonTitle={'Cancel'}
                buttonRightTitle={'Save'}
                value={this.state.email}
                dialogAndroidProps={{
                    widgetColor: colors.black,
                    positiveColor: colors.black,
                    negativeColor: colors.black,
                }}
            />

            <SettingsEditText
                disabled="true"
                title="Phone"
                dialogDescription={'Change your phone number.'}
                valuePlaceholder="..."
                positiveButtonTitle={'Continue'}
                negativeButtonTitle={'Cancel'}
                buttonRightTitle={'Save'}
                onSaveValue={value => {
                    this.onPhoneChange(value);
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
                    this.onGenderChange(value);
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

                <Text>RANDOM {this.state.gender}</Text>
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


  const mapStateToProps = (state) => {
        return {
            //'username': state.authReducer.username,
            'gender': state.authReducer.gender,
            //'phone': state.authReducer.phone
        }
  }

  const mapDispatchToProps = {
    changeGender,
    changePhone,
    signOut
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(Settings);