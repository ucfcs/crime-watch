import { StyleSheet } from 'react-native';
import { theme } from "../../index"
import { windowHeight } from '../../../../styles/theme';
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

export const androidStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "transparent",
    },

    scrollContentContainer:{
        paddingBottom: 1
    },

    navView:{
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 0
    },

    settingsContainer: {
        width: windowWidth,
        height: 100,
        backgroundColor: color.white_transparent
    },

    settingsButton:{
        height: 100,
        width: 100,
        paddingLeft: 30,
        paddingTop: 50,
        backgroundColor: 'transparent'
    },

    navButton2:{
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth / 2,
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
        backgroundColor: color.white_transparent,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        paddingBottom: 15,
        marginBottom: 1
    },

    spacerText:{
        paddingTop: 20,
        color: color.white,
        fontSize: 24,
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
        backgroundColor: "transparent",
        margin: 'auto',
        marginBottom: 1
    },

    reportsHeader:{
        height: 45,
        backgroundColor:  color.white_transparent,
        paddingLeft: 30,
        paddingRight: 10
    },

    reportsText:{
        margin: 5,
        color: color.white
    },

    reportsRow:{
        flexDirection: 'row',
        backgroundColor: color.white_transparent,
        height: 100,
        marginTop: 1,
        marginBottom: 1,
        alignContent: 'center',
        paddingLeft: 30,
        paddingRight: 10
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
        backgroundColor: color.white_transparent,
        height: windowHeight - 100
    },

    legend:{
        flex: 1,
        paddingLeft: 60,
        paddingRight: 60,
        bottom: 80
    },
    
    footer: {
        height: 100,
        backgroundColor: color.white_transparent
    }

});

export const iosStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.white
    },

    scrollContentContainer:{
        paddingBottom: 100
    },

    navView:{
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 0
    },

    navButton1:{
        height: 100,
        width: windowWidth / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.light_blue,
    },

    navButton2:{
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        width: windowWidth / 2,
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
        backgroundColor: color.white,
        height: 80,
        marginBottom: 1,
        alignContent: 'center',
        paddingLeft: 40
    },

    reportMapButton:{
        height: 40,
        width: 40
    },

    pieContainer:{
        margin: 40
    }
});
