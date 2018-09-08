import React from 'react';
var { View, StyleSheet, Alert, Text } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { AsyncStorage } from 'react-native';
import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
import action from '../../actions'
const { signOut } = auth;

const { color } = theme;

class Home extends React.Component {
    constructor(){
        super();
        this.state = { 'user': '', 'gender': ''};
        this.onSignOut = this.onSignOut.bind(this);
    }

    // alternative method
    componentDidMount = async () => {
        AsyncStorage.getItem('user').then(response => {
            var user = JSON.parse(response).username;
            var gender = JSON.parse(response).gender;
            
            this.setState({ 'user': user, 'gender': gender });
        }).done();
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

    render() {
        return (
            <View style={styles.container}>
                    <Text>Welcome, {this.state.user}!</Text>
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

                    <Button
                    raised
                    //borderRadius={20}
                    title={'LOG OUT'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>
            </View>
        );
    }
}

export default connect(null, { signOut })(Home);