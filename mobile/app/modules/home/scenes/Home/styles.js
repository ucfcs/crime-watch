import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

export const androidStyles = StyleSheet.create({
    container:{
        flex:1,
    },

    containerView:{
        backgroundColor: 'transparent'
    },

    navView:{
        flexDirection: 'row',
    },

    userView:{
        flex:1,
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
        backgroundColor: 'white'
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
