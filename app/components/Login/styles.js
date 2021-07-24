import { ScaledSheet } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default ScaledSheet.create({
  logoView: {
    height: hp(10), //"20%",
    width: wp(70), //"310@s",
    alignSelf: "flex-start",
    marginTop: hp(3),
    marginLeft: wp(5),
    justifyContent: "flex-end",
  },
  logo: {
    flex: 1,
    width: undefined, //wp(78), //"82%",
    height: undefined, //hp("75@s",
    //top: "120@s",
    //right: "40@s",
    //position: "absolute",
  },
  titleView: {
    flexDirection: "row",
    width: wp(90), //"310@s",
    alignSelf: "center",
    height: hp(25), //"25%",
  },
  title: {
    //position: "absolute",
    width: wp(50), //"180@s",
    //top: "180@s",
    //left: "20@s",
    //flex: 1,
    fontSize: hp(9), //"55@s",
  },
  doodle: {
    flex: 1,
    //position: "absolute",
    width: undefined, //wp(45), //"160@s",
    height: hp(30), //"170@s",
    resizeMode: "contain",
    //left: "210@s",
    //top: "170@s",
  },
  inputView: {
    width: wp(90), //"310@s",
    alignSelf: "center",
    alignItems: "center",
    height: hp(28), //"30%",
  },
  emailAddressTextInput: {
    width: wp(90), //"310@s",
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
    width: wp(90), //"310@s",
    //top: "410@s",
    //position: "absolute",
  },
  passwordHelperTextView: {
    width: wp(90), //"310@s",
    height: hp(10), //"100@s",
  },
  passwordHelperText: {
    position: "absolute",
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
    height: hp(20),
    justifyContent: "space-evenly",
  },
  forgotPasswordView: {
    //top: "540@s",
    alignSelf: "center",
  },
  forgotPWText: {
    fontSize: hp(2.5), //"16@s",
    fontWeight: "bold",
    alignSelf: "center",
  },
  signUpView: {
    //top: "580@s",
    flexDirection: "row",
    alignSelf: "center",
  },
  signUpText: {
    fontSize: hp(2.5), //"16@s",
  },
  registerText: {
    fontSize: hp(2.5), //"16@s",
    fontWeight: "bold",
    alignSelf: "center",
  },
  dividerView: {
    paddingLeft: hp(1), //"20@s",
    paddingRight: hp(1), //"20@s",
    //top: "530@s",
    flexDirection: "row",
    alignItems: "center",
  },
  dividerLine: {
    flex: 1,
    height: hp(0.1), //"0.8@s",
  },
  dividerText: {
    top: hp(-0.2), //"-2@s",
    width: wp(8), //"30@s",
    textAlign: "center",
  },
});
