import React from 'react';
var { View, StyleSheet, Alert, Text } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"
import store from '../../../../redux/store';

import { actions as auth, theme } from "../../../auth/index"

const { color } = theme;

class Home extends React.Component {
    constructor(){
        super();
        this.state = { 'username': '', 'gender': ''};

    }

    // alternative method
    componentDidMount = async (prevProps, prevState, snapshot) => {
        console.log(prevProps);
        const state = store.getState().authReducer.user;
   

        var uid = state.uid;console.log(uid);
        var gender = state.gender;
        var username = state.username;
        var phone = state.phone;
        var email = state.email;

            this.setState({ 'username': username, 'gender': gender, 'uid': uid, 'phone': phone}).done();
        
            store.subscribe(() => {
    
            this.setState({ 'username': username, 'gender': gender, 'uid': uid, 'phone': phone}).done();
            });
    }
   
    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    render() {
        return (
            <View style={styles.container}>
                    <Text>Welcome, {this.state.username}!</Text>
                    <Text>Gender, {this.state.gender}!</Text>
                    <Button
                    raised
                    title={'REPORTS'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={Actions.Report}/>

                    <Button
                    raised
                    title={'SETTINGS'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={Actions.Settings}/>

            </View>
        );
    }
}


const mapDispatchToProps = () => ({

})

export default connect(null, mapDispatchToProps)(Home);