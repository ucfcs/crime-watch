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
        flex:1
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
        color: color.white
    },

    spacer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    reportListTitle:{
        fontSize: 20,
        fontWeight: 'bold'
    },

    containerView:{
        backgroundColor: 'transparent'
    },

    buttonContainer:{
        flex:1,
        alignItems: "center"
    },

    button:{
        width: 50,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2,
    },

    mapButton:{
        width: 50,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2,
    },

    reportsContainer:{
        flex: 1,
        backgroundColor: '#fff'
    },

    reportsHeader:{
        height: 30,
        backgroundColor: '#808B97'
    },

    reportsText:{
        margin: 5
    },

    reportsRow:{
        flexDirection: 'row',
        backgroundColor: '#FFF1C1'
    }
});
