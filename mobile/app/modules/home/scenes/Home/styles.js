import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

export const androidStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.white
    },

    navView:{
        flexDirection: 'row',
        flex: 1,
    },

    navButton1:{
        height: 100,
        width: windowWidth / 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.light_blue,
    },

    navButton2:{
        height: 100,
        width: windowWidth / 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.orange,
    },

    navButton3:{
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth / 3,
        backgroundColor: color.green,
    },

    navButtonContent:{
        height: 40,
        width: 40,
    },

    userView:{
        flex:100,
        paddingVertical: "20%",
        justifyContent: "center",
        alignItems: "center"
    },

    tableContainer:{
        flex: 1,
        height:400,
        width:400
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center",
    },

    button:{
        flex: 1,
        height: 35,
        width: 35,
        marginTop: 12,
        borderRadius: 8,
        borderWidth: 1,
    },

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
