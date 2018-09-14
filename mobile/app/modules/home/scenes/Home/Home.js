import React from 'react';
var { View, StyleSheet, Alert, Text } = require('react-native');
import bindActionCreators from 'redux';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"
import store from '../../../../redux/store';

import { actions as auth, theme } from "../../../auth/index"
import { actions as home } from "../../../home/index"

const { color } = theme;

class Home extends React.Component {
    constructor(props){
        super(props);
        //console.log("HOME" + props);
        this.state = { 'username': '', 'gender': ''};

    }

    // alternative method
    componentDidMount = async (prevProps, prevState, snapshot) => {
        //console.log(prevProps);
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

                <View style={styles.userView}>

                    <Text>Welcome, {this.state.username}!</Text>

                    <Text>Gender, {this.state.gender}!</Text>
                </View>
                    
                <Button
                raised
                title={'REPORTS'}
                containerViewStyle={styles.button}
                // buttonStyle={[styles.button]}
                //textStyle={styles.buttonText}
                onPress={Actions.Report}/>
                
                <Button
                raised
                title={'SETTINGS'}
                containerViewStyle={[styles.button]}
                // buttonStyle={[styles.button]}
                //textStyle={styles.buttonText}
                onPress={Actions.Settings}/>
                
                <Button
                raised
                //borderRadius={20}
                title={'REPORTS MAP'}
                containerViewStyle={[styles.button]}
                //buttonStyle={[styles.button]}
                //textStyle={'bold'}
                onPress={Actions.Map}/>

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

const mapStateToProps = (state) => {
    return{
        username: state.username,
        gender: state.gender
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({}, dispatch)
    }
}

export default connect(mapStateToProps, {})(Home);