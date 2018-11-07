import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, fontFamily, normalize, color } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 10,
        backgroundColor: color.light_grey_transparent,
    },

    inputContainer:{
        width: windowWidth - 100,
        height: normalize(65),
        fontSize: fontSize.small,
        color: color.white,
        fontFamily: fontFamily.bold,
        borderBottomColor: color.white,
    }
});

export default styles;