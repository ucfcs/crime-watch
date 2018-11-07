import { Dimensions, Platform } from 'react-native';
import { moderateScale as normalize } from 'react-native-size-matters';

const color = {
    black: "#3B3031",
    light_black: "#414141",
    main: "rgb(99,139,250)",
    white: "#ffffff",
    //light_grey: "#eaeaea",
    grey: "rgb(165, 165, 165)",
    red: "red",
    underlayColor: "#ddd",

    // different theme
    light_blue: 'rgb(139, 183, 227)',
    light_blue_transparent: 'rgba(139, 183, 227, 0.8)',
    grey_transparent: 'rgba(165, 165, 165, 0.8)',
    orange_transparent: 'rgba(244, 156, 73, 0.8)',
    green_transparent: 'rgba(110, 209, 187, 0.8)',
    navy_transparent: 'rgba(42, 60, 89, 0.8)',
    light_grey_transparent: 'rgba(242, 242, 242, 0.2)',
    orange: 'rgb(244, 156, 73)',
    light_grey: 'rgb(242, 242, 242)',
    navy: 'rgb(37, 56, 76)',
    green: 'rgb(110, 209, 187)'
}

const fontSize = {
    small: normalize(12),
    regular: normalize(14),
    large: normalize(21),
    extralarge: normalize(26)
}

const fontFamily = {
    extrabold: "RobotoExtraBold",
    bold: "RobotoBold",
    medium: "RobotoMedium",
    regular: "RobotoRegular",
    light: "RobotoLight"
}

const padding = 8;
const navbarHeight = (Platform.OS === 'ios') ? 64 : 54;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const tabColor = (Platform.OS === "ios") ? "rgba(73,75,76, .5)" : "rgba(255,255,255,.8)";
const selectedTabColor = (Platform.OS === "ios") ? "rgb(73,75,76)" : "#fff";

const tabIconStyle = { size: 21, color: tabColor, selected: selectedTabColor }
const navTitleStyle = { fontSize: fontSize.regular , fontFamily: fontFamily.extrabold, color: color.navy }

export {
    color,
    fontSize,
    fontFamily,
    padding,
    navbarHeight,
    windowWidth,
    windowHeight,
    tabIconStyle,
    navTitleStyle,
    normalize
}
