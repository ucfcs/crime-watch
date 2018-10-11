import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;
var { Platform } = require("react-native")

export const androidStyles = StyleSheet.create({
 
    container:{
        flex: 1,
        backgroundColor: color.white
    },

    containerViewStyle:{
        
    },

    button:{

    },

    butotnText:{

    }

});

export const iosStyles = StyleSheet.create({
 
    container:{
        flex: 1,
        backgroundColor: color.white
    },

    containerViewStyle:{
        
    },

    button:{

    },

    butotnText:{

    }

});