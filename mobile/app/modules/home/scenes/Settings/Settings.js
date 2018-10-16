import React from 'react';
var { View, TouchableHighlight, Alert, Text, ScrollView, Platform, TextInput} = require('react-native');

import {SettingsDividerShort, SettingsDividerLong, SettingsEditText, SettingsCategoryHeader, SettingsSwitch, SettingsPicker} from 'react-native-settings-components';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import store from '../../../../redux/store';

import {androidStyles} from "./styles"

import { actions as auth, theme } from "../../../auth/index"
import { actions as home } from "../../../home/index"
import { addAlexaCode } from "../../api"

const { signOut } = auth;
const { changePhone, changeGender } = home;


const { color } = theme;

class Settings extends React.Component {
    constructor(props){
        super(props);
        
        // Set some initial state (variables that you need to display somewhere on this screen)
        //
        this.state = { 
            alexa: '',
            uid: '',
            username: '',
            phone: '',
            allowedPushNotifications: false,
            gender: '',
            email: ''
        };

        // Any function that requires a state change will need to be bound onto the component. Do that for every new function here
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    // These are the functions that will be executed when a user does something on the app (button press for example). Bind these above
    //
    onPhoneChange(value) {
        this.setState({phone: value});
        this.props.changePhone(this.state.uid, value);
    }

    onGenderChange(value) {
        this.setState({gender: value});
        this.props.changeGender(this.state.uid, value);
    }

    onAlexaCodeEnter(value) {
        console.log(value);
        addAlexaCode(this.state.uid, this.state.phone, value, function (success, error) 
        {
            if (success)
            {
                console.log("Successfully added Alexa device ID to user table");
            }
            else
            {
                console.log("Unable to add Alexa device ID to user table: ");
                console.log(error);
            }
        });
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this));
    }

    onSuccess() {
        console.log("STATE JUST BEFORE SIGN OUT:");
        console.log(this.state);
        Actions.reset("Auth");
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    // The important part. ComponentDidMount happens ONCE when the PAGE is initially loaded. There is where you tap into the store to retrieve the current state. 
    // Update this.state by using the setState method on each unique field that you'll need for the page
    //
    componentDidMount = async () => {

        const state = store.getState().authReducer;

        console.log(state);

        var uid = state.uid;
        var username = state.username;
        var gender = state.gender;
        var phone = state.phone;
        var email = state.email;

        this.setState({ 'username': username, 'gender': gender, 'uid': uid, 'phone': phone, 'email': email});
    }

    // When the component receives new properties i.e. the gender was changed way back up in the root level of the app (because we linked our component to it),
    // a rerender will happen via this.setState(). Place all of the variables that will be updated in here.
    //
    componentWillReceiveProps(nextProps) {
        if (nextProps.gender != this.props.gender)
        {
            this.setState({ gender: nextProps.gender });  
        }
    }

    render() {
        const styles = (Platform.OS === 'ios')? iosStyles : androidStyles;
        var alexaCodeBox;
        if (Platform.OS === 'ios')
        {
            alexaCodeBox = 
            <SettingsEditText
                    title="Alexa Code"
                    dialogDescription={'Add the code Alexa gives you in order to report an incident.'}
                    valuePlaceholder="..."
                    positiveButtonTitle={'Continue'}
                    negativeButtonTitle={'Cancel'}
                    buttonRightTitle={'Save'}
                    onSaveValue={value => {
                        this.onAlexaCodeEnter(value);
                    }}
                    value={'000000'}
                    dialogAndroidProps={{
                        widgetColor: colors.black,
                        positiveColor: colors.black,
                        negativeColor: colors.black,
                    }}
                />
        }
        else
        {
            alexaCodeBox = <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={"Enter Alexa Code"}
            keyboardType='numeric'
            blurOnSubmit={true}
            maxLength={6}
            clearButtonMode="always"
            onSubmitEditing={(event) => this.onAlexaCodeEnter(event.nativeEvent.text)}
            />

        }

        return (
            <ScrollView style={styles.container}>
        
                <SettingsCategoryHeader title={'My Account '} textStyle={(Platform.OS === 'android') ? {color: colors.black} : null}/>
        
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
                
                {/** Box to enter in alexa code, different between android and ios */}
                {alexaCodeBox}

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

  // When our state changes, we want the new properties to be passed downwards and eventually get to this page. This function will link 
  // our props to the state essentially. Place those changing variables here
  //
  const mapStateToProps = (state) => {
        return {
            'gender': state.authReducer.gender,
            'phone': state.authReducer.phone
        }
  }

  // Extremely important, this maps the properties to the actions that we want to fire off. Basically, changeGender is an action created from action.js
  // It's responsible for taking in an action and state, and tapping into the reducer to modify the state. All actions will need to be connected via
  // this component by using the connect() method
  const mapDispatchToProps = {
    changeGender,
    changePhone,
    signOut
  }
    
  export default connect(mapStateToProps, mapDispatchToProps)(Settings);
