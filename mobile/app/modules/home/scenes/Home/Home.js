import React from 'react';
var { View, ScrollView, StyleSheet, Alert, Text, Platform, TouchableOpacity } = require('react-native');
import bindActionCreators from 'redux';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import { iosStyles, androidStyles } from "./styles";

import store from '../../../../redux/store';

import { actions as auth, theme } from "../../../auth/index"
import { Table, Row, Rows } from 'react-native-table-component';
import { actions as home } from "../../../home/index"

const { color } = theme;

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = { 'username': '', 'gender': ''};
    }

    componentDidMount = async () => {
        this.props.navigation.addListener('willFocus',() => {
            const authState = store.getState().authReducer;
            const homeState = store.getState().homeReducer;
            console.log(authState);
            var username = authState.username;
 
            try{
                var gender = homeState.gender;

            }
            catch (err){
                var gender = authState.gender;
     
            }

            this.setState({ 'username': username, 'gender': gender});
        });
    }
   
    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    render() {
        const styles = (Platform.OS === 'ios')? iosStyles : androidStyles;
     
        return (
            <ScrollView style={styles.container}>

                <View style={styles.navView}>
                 
                    <Button
                    raised
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    onPress={Actions.Settings}/>
                    
                </View>

                <View style={styles.userView}>



                    <Text>Welcome, {this.state.username}!</Text>

                    <Text>Gender, {this.props.gender}!</Text>

                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={styles.tableContainer}>
                        <Row data={["Example", "Header"]} style={styles.head}/>
                        <Rows data={[['1', '2'],['3', '4']]} style={styles.text}/>
                      
                    </Table>


                    <TouchableOpacity onPress={Actions.Map}>
                        <Text>PRESS HERE TO SEE REPORTS MAP</Text>
                    </TouchableOpacity>
                    
                </View>

            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return{
       // username: state.homeReducer.username,
        //gender: state.homeReducer.gender
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({}, dispatch)
    }
}

export default connect(mapStateToProps, {})(Home);