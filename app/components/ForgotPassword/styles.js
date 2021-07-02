import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  logo: {
    width: "100%",
    height: "60@s",
    top: "120@s",
    right: "40@s",
    position: "absolute",
  },
  doodle: {
    position: "absolute",
    width: "130@s",
    height: "150@s",
    left: "230@s",
    top: "180@s",
  },
  title: {
    position: "absolute",
    width: "300@s",
    top: "180@s",
    left: "20@s",
    fontSize: "45@s",
    fontFamily: "sans-serif-thin",
  },
  emailTextInput: {
    width: "310@s",
    top: "300@s",
    alignSelf: "center",
    position: "absolute",
  },
  emailHelperText: {
    position: "absolute",
    top: "360@s",
    left: "9@s",
  },
  buttonView: {
    position: "absolute",
    top: "380@s",
    alignSelf: "center",
  },
  signInSection: {
    flexDirection: "row",
    alignSelf: "center",
    top: "420@s",
  },
  signInText: {
    fontSize: "16@s",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
