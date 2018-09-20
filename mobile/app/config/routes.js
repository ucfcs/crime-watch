import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';
import Report from '../modules/home/scenes/Report';
import Settings from '../modules/home/scenes/Settings';
import Map from '../modules/home/scenes/Map';

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";

import { color, navTitleStyle } from "../styles/theme";


export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false,
            exist: false, //indicates if user exist in realtime database,
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((exist, isLoggedIn) => {
            _this.setState({isReady: true, exist, isLoggedIn});
        }));
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Scene key="root" hideNavBar 
                       navigationBarStyle={{backgroundColor: "#1e4351"}}
                       titleStyle={navTitleStyle}
                       navBarButtonColor={color.white}
                       backButtonTintColor={color.white}>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register" back/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
                        <Scene key="Login" component={Login} title="Login"/>
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                    </Stack>

                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Home" component={Home} title="Home" initial={true} type={ActionConst.REPLACE}/>
                        <Scene key="Report" component={Report} title="Report"/>
                        <Scene key="Settings" component={Settings} title="Settings"/>
                        <Scene key="Map" component={Map} title="Map"/>
                    </Stack>
                </Scene>
            </Router>
        )
    }
}