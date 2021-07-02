import EStyleSheet from "react-native-extended-stylesheet";
import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  logo: {
    width: "100%",
    height: "60@s",
    right: "40@s",
    top: "150@s",
  },
  backgroundImage: {
    width: "100%",
    height: "110%",
  },
  doodle: {
    width: "200@s",
    height: "210@s",
    position: "absolute",
    bottom: "50@s",
  },
  title: {
    fontSize: "55@s",
    left: "20@s",
    lineHeight: "58@s",
    fontFamily: "sans-serif-thin",
    top: "150@s",
  },
  signUpButton: {
    alignSelf: "center",
    top: "150@s",
  },
  loginButton: {
    alignSelf: "center",
    top: "130@s",
  },
});
