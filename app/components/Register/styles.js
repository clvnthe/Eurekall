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
    top: -20,
    left: -56,
    position: "absolute",
  },
  signInSection: {
    position: "absolute",
    flexDirection: "row",
    top: 610,
    alignSelf: "center",
  },
  signInText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 2,
  },
});
