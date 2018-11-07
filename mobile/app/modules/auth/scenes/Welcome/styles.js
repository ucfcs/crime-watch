import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    topContainer:{
        flex:1,
        paddingHorizontal:15,
        paddingTop: padding * 2,
        paddingBottom: padding * 2,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: color.light_blue_transparent,
    },

    image:{
        height: 250,
        width: 250,
        backgroundColor: 'transparent',
        marginBottom: padding,
        marginTop: 50,
        resizeMode
    },

    title:{
        fontSize: fontSize.large + 10,
        lineHeight: fontSize.large + 10,
        fontFamily: fontFamily.bold,
        color:color.white,
        letterSpacing: 1
    },

    subText:{
        color: "#414141",
        fontSize: fontSize.large,
        lineHeight: fontSize.large + 10,
        marginVertical:padding * 2
    },

    //===============================

    bottomContainer:{
        backgroundColor: color.light_blue_transparent,
        paddingVertical: padding * 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center",
    },

    containerView:{
        width: windowWidth - 40,
        height: 300,
    },

    socialButton:{
        height: normalize(55),
        borderRadius:4,
        marginTop:0,
        marginBottom:0
    },

    button:{
        backgroundColor: color.orange,
        height: normalize(55),
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },

    bottom:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: padding * 2,
    },

    bottomText:{
        fontSize: fontSize.small,
        fontFamily: fontFamily.medium,
        marginRight: 5,
        color: color.light_grey
    },

    signUpText:{
        fontSize: fontSize.regular,
        fontWeight: 'bold',
        color: color.orange,
        fontFamily: fontFamily.extrabold
    },

    divider:{
        backgroundColor: '#D0D5DA',
        position:"absolute",
        top:19,
        left: 20,
        right: 20
    },

    orText:{
        backgroundColor: color.white,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        color: "#414141",
        paddingHorizontal: padding
    }
});

export default styles;