import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    flex:1,
    backgroundColor: color.white
  },
});

export default styles;