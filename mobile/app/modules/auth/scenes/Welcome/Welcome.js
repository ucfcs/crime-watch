import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image, ImageBackground} from 'react-native';

import {Button, SocialIcon, Divider} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {actions as auth} from "../../index";

import styles from "./styles"
import Form from "../../components/Form"
const {login} = auth;

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email Address",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email"
    },
    {
        key: 'password',
        label: "Password",
        placeholder: "Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "password"
    }
];

const error = {
    general: "",
    email: "",
    password: ""
}



class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {error: error}

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onForgotPassword() {
        Actions.ForgotPassword()
    }
    
    onSubmit(data) {
        this.setState({error: error}); //clear out error messages
        console.log("STATE JUST BEFORE LOGIN:");
        console.log(this.state);
        this.props.login(data, this.onSuccess, this.onError)
    }
    
    onSuccess({exists, user}) {
        if (exists) Actions.Main()
        else Actions.CompleteProfile({user})
    }
    
    onError(error) {
        let errObj = this.state.error;
    
        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }
        this.setState({error: errObj});
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={{
                    flex: 1,
                    }}
                    source={require('../../../../assets/images/city.jpg')}
                >

                <View style={styles.topContainer}>
                    <Image style={styles.image} source={require('../../../../assets/images/color.png')}/>
                    <Text style={styles.title}>Crime Watch</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <View style={styles.containerView}>
                            <Form fields={fields}
                            
                                showLabel={false}
                                onSubmit={this.onSubmit}
                                buttonTitle={"LOG IN"}
                                error={this.state.error}
                                onForgotPassword={this.onForgotPassword}/>
                        </View>
                    </View>

                    <View style={styles.bottom}>
                        <Text style={styles.bottomText}>
                            Don't have an account?
                        </Text>

                        <TouchableOpacity onPress={Actions.Register}>
                            <Text style={styles.signUpText}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ImageBackground>
            </View>
        );
    }
}


export default connect(null, {login})(Welcome);