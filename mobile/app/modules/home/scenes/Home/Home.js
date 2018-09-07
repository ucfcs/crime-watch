import React from 'react';
var { View, StyleSheet, Alert } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
import action from '../../actions'
const { signOut } = auth;

const { color } = theme;

class Home extends React.Component {
    constructor(){
        super();
        this.state = { user: ''}
        
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

    // attempting to grab user data and display it
    async getUser() 
    {
        try
        {
            const data = await AsyncStorage.getItem('user');
            console.log("Accessing user" + data);
            this.setState({ user: JSON.parse(data) });
        }
        catch (err)
        {
            console.log(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
                    title={'STUFF'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>

                    <Button
                    raised
                    title={'LOG OUT'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>

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