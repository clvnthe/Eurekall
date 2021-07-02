import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  logo: {
    width: "100%",
    height: "60@s",
    top: "0@s",
    right: "40@s",
    position: "absolute",
  },
  doodle: {
    position: "absolute",
    width: "160@s",
    height: "170@s",
    left: "210@s",
    top: "50@s",
  },
  title: {
    position: "absolute",
    width: "60%",
    top: "60@s",
    left: "20@s",
    fontSize: "55@s",
    fontFamily: "sans-serif-thin",
  },
  nameTextInput: {
    width: "310@s",
    top: "200@s",
    alignSelf: "center",
    position: "absolute",
  },
  nameHelperText: {
    position: "absolute",
    top: "260@s",
    left: "9@s",
  },
  emailTextInput: {
    width: "310@s",
    top: "290@s",
    alignSelf: "center",
    position: "absolute",
  },
  emailHelperText: {
    position: "absolute",
    top: "350@s",
    left: "9@s",
  },
  usernameTextInput: {
    width: "310@s",
    top: "380@s",
    alignSelf: "center",
    position: "absolute",
  },
  usernameHelperText: {
    position: "absolute",
    top: "440@s",
    left: "9@s",
  },
  passwordTextInput: {
    width: "310@s",
    top: "470@s",
    alignSelf: "center",
    position: "absolute",
  },
  passwordHelperText: {
    position: "absolute",
    top: "530@s",
    left: "9@s",
  },
  buttonView: {
    top: "550@s",
    alignSelf: "center",
  },
  signInSection: {
    position: "absolute",
    flexDirection: "row",
    top: "620@s",
    alignSelf: "center",
  },
  signInText1: {
    fontSize: "16@s",
  },
  signInText2: {
    fontSize: "16@s",
    fontWeight: "bold",
    paddingLeft: "1@s",
  },
});
