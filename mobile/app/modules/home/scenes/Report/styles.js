import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        //padding: 30,
        paddingVertical: '30%'
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

export default styles;