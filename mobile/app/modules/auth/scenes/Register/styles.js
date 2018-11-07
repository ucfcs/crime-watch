import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily, windowHeight } = theme;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'transparent',
  },

  containerView: {
    flex:1,
    paddingTop: 120,
    minHeight: windowHeight,
    paddingHorizontal:15,
    paddingBottom: padding * 2,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: color.light_blue_transparent,

  }
});

export default styles;