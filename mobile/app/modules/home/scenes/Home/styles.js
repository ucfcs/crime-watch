import { StyleSheet } from 'react-native';
import { theme } from "../../index"
import { windowHeight } from '../../../../styles/theme';
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

export const androidStyles = StyleSheet.create({
    container:{
        flex:1
    },

    navView:{
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 0
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
        height: 30,
        width: 30,
        marginBottom: 5
    },

    navText:{
        color: color.white
    },

    userView:{
        flex: 1,
        paddingVertical: "20%",
        justifyContent: "center",
        alignItems: "center"
    },

    reportListTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: color.white
    },

    spacer:{
        backgroundColor: color.navy,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },

    spacerText:{
        color: color.white,
        fontSize: 24
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
        flex: 2,
        backgroundColor: color.white,
        margin: 'auto'
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
        backgroundColor: color.white,
        height: 60,
    },

    reportsCell:{
        borderWidth: 0,
    },

    reportMapButton: {
        height: 40,
        width: 40
    },

    // pie chart
    pieContainer:{
        margin: 40,
    },

});

export const iosStyles = StyleSheet.create({
    container:{
        flex:1
    },

    navView:{
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 0
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
        height: 30,
        width: 30,
        margin: 5,
        color: color.white
    },

    navText:{
        color: color.white
    },

    userView:{
        flex:1,
        paddingVertical: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    reportListTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: color.white
    },

    spacer:{
        backgroundColor: color.navy,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    },

    spacerText:{
        color: color.white,
        fontSize: 24
    },

    buttonContainer:{
        flex: 1,
        alignItems: "center"
    },

    button:{
        width: 50,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2
    },

    mapButton:{
        width: 50,
        height: 18,
        backgroundColor: '#78B7BB',
        borderRadius: 2
    },

    reportsContainer:{
        
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
        backgroundColor: color.white
    },

    reportMapButton:{
        height: 40,
        width: 40
    },

    pieContainer:{
        margin: 40
    }
});
