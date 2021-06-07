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
    height: 140,
    top: 100,
    left: -50,
    position: "absolute",
  },
  signInSection: {
    flexDirection: "row",
    alignSelf: "center",
    top: 430,
  },
  signInText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
