import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: "100%",
    height: 130,
    top: 100,
    left: -46,
    position: "absolute",
  },
  registerSection: {
    flexDirection: "row",
  },
  registerText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  forgotPWText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
