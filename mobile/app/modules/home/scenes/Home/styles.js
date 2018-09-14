import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
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

export default styles;