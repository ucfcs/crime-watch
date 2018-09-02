import React from 'react';
var { View, StyleSheet, Alert, Text } = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
import action from '../../actions'
const { signOut } = auth;

const { color } = theme;



class Report extends React.Component {
    constructor(){
        super();
        this.state = { }
    }

    // custom stuff
    showReports() {
        
   
    }

    render() {
        return (
            <View style={styles.container}>
                    <Text>Report</Text>
                    
            </View>
        );
    }
}

export default connect(null, {})(Report);