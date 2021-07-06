import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  logoView: {
    height: "15%",
    width: "310@s",
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: "82%",
    height: "75@s",
    //top: "0@s",
    //right: "40@s",
    //position: "absolute",
  },
  titleView: {
    flexDirection: "row",
    width: "310@s",
    alignSelf: "center",
    height: "20%",
  },
  doodle: {
    //position: "absolute",
    //width: "160@s",
    height: "170@s",
    //left: "210@s",
    //top: "50@s",
    flex: 1,
  },
  title: {
    //position: "absolute",
    flex: 2,
    //top: "60@s",
    //left: "20@s",
    fontSize: "48@s",
  },
  inputView: {
    width: "310@s",
    alignSelf: "center",
    alignItems: "center",
    height: "55%",
  },
  nameTextInput: {
    width: "310@s",
    //top: "200@s",
    //position: "absolute",
  },
  nameHelperText: {
    //position: "absolute",
    //top: "260@s",
    //left: "9@s",
    alignSelf: "flex-start",
  },
  emailTextInput: {
    width: "310@s",
    //top: "290@s",
    //position: "absolute",
  },
  emailHelperText: {
    position: "absolute",
    //top: "350@s",
    //left: "9@s",
    alignSelf: "flex-start",
  },
  usernameTextInput: {
    width: "310@s",
    //top: "380@s",
    //alignSelf: "center",
    //position: "absolute",
  },
  usernameHelperText: {
    //position: "absolute",
    //top: "440@s",
    //left: "9@s",
    alignSelf: "flex-start",
  },
  passwordTextInput: {
    width: "310@s",
    //top: "470@s",
    //alignSelf: "center",
    //position: "absolute",
  },
  passwordHelperText: {
    position: "absolute",
    //top: "530@s",
    //left: "9@s",
    alignSelf: "flex-start",
  },
  buttonView: {
    //top: "550@s",
    alignSelf: "center",
  },
  signInSection: {
    //position: "absolute",
    flexDirection: "row",
    //top: "620@s",
    alignSelf: "center",
    flex: 1,
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
