import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  logoView: {
    height: "20%",
    width: "310@s",
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  logo: {
    width: "82%",
    height: "75@s",
    //top: "120@s",
    //right: "40@s",
    //position: "absolute",
  },
  titleView: {
    flexDirection: "row",
    width: "310@s",
    alignSelf: "center",
    height: "25%",
  },
  doodle: {
    //position: "absolute",
    width: "160@s",
    height: "170@s",
    //left: "210@s",
    //top: "170@s",
  },
  title: {
    //position: "absolute",
    width: "180@s",
    //top: "180@s",
    //left: "20@s",
    fontSize: "55@s",
  },
  inputView: {
    width: "310@s",
    alignSelf: "center",
    alignItems: "center",
    height: "30%",
  },
  emailAddressTextInput: {
    width: "310@s",
    //top: "320@s",
    //position: "absolute",
  },
  emailAddressHelperText: {
    //position: "absolute",
    //top: "380@s",
    //left: "9@s",
    alignSelf: "flex-start",
  },
  passwordTextInput: {
    width: "310@s",
    //top: "410@s",
    //position: "absolute",
  },
  passwordHelperText: {
    //position: "absolute",
    //top: "470@s",
    //left: "9@s",
    alignSelf: "flex-start",
  },
  loginButtonView: {
    //position: "absolute",
    //top: "490@s",
    //paddingTop: "2@s",
    alignSelf: "center",
  },
  bottomView: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  forgotPasswordView: {
    //top: "540@s",
    alignSelf: "center",
  },
  forgotPWText: {
    fontSize: "16@s",
    fontWeight: "bold",
    alignSelf: "center",
  },
  signUpView: {
    //top: "580@s",
    flexDirection: "row",
    alignSelf: "center",
  },
  signUpText: {
    fontSize: "16@s",
  },
  registerText: {
    fontSize: "16@s",
    fontWeight: "bold",
    alignSelf: "center",
  },
  dividerView: {
    paddingLeft: "20@s",
    paddingRight: "20@s",
    //top: "530@s",
    flexDirection: "row",
    alignItems: "center",
  },
  dividerLine: {
    flex: 1,
    height: "0.8@s",
  },
  dividerText: {
    top: "-2@s",
    width: "30@s",
    textAlign: "center",
  },
});
