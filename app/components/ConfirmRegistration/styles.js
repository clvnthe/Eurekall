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
    height: "30%",
  },
  logo: {
    width: "100%",
    height: 130,
    top: 90,
    left: -60,
    position: "absolute",
  },
  resendCodeTextSection: {
    top: 530,
    flexDirection: "row",
    alignSelf: "center",
  },
  loginTextSection: {
    top: 595,
    flexDirection: "row",
    alignSelf: "center",
  },
  resendCodeText: {
    color: "#28A44B",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    color: "#28A44B",
    fontSize: 16,
    fontWeight: "bold",
  },
});
