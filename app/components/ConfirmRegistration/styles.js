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
    width: "160@s",
    height: "170@s",
    left: "230@s",
    top: "170@s",
  },
  title: {
    position: "absolute",
    width: "90%",
    top: "180@s",
    left: "20@s",
    fontSize: "38@s",
    fontFamily: "sans-serif-thin",
  },
  loginButtonView: {
    position: "absolute",
    top: "330@s",
    paddingTop: "2@s",
    alignSelf: "center",
  },
  signInSection: {
    flexDirection: "row",
    alignSelf: "center",
    top: "380@s",
  },
  signInText: {
    fontSize: "16@s",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
