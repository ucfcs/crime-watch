import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

export const androidStyles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: '30%'
    },

    userView:{
        flex:0,
    },

    containerView:{
        backgroundColor: 'transparent'
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center",
    },

    button:{
        flex: 1,
        padding: 22,
        margin: 25,
    }
});

export const iosStyles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: '30%'
    },

    userView:{
        flex:0,
    },

    containerView:{
        backgroundColor: 'transparent'
    },

    buttonContainer:{
        flex:1,
        alignItems: "center"
    },

    button:{
        flex: 1,
        padding: 2,
        margin: 2,
    }
});
