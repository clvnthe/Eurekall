import { StyleSheet, Platform, StatusBar } from "react-native";
import colors from "../../../assets/theme/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logoContainer: {
    top: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  logo: {
    width: "100%",
    height: 130,
    top: 140,
    left: -40,
    position: "absolute",
  },
  registerSection: {
    flexDirection: "row",
  },
  registerText: {
    textDecorationLine: "underline",
    color: colors.primary,
  },
  forgotPWText: {
    textDecorationLine: "underline",
    color: colors.primary,
    paddingLeft: 130,
  },
});
