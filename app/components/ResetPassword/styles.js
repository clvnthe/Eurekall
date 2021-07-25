import { ScaledSheet } from "react-native-size-matters";
import {responsiveHeight} from "react-native-responsive-dimensions";

export default ScaledSheet.create({
  logo: {
    width: "82%",
    height: "75@s",
    right: "40@s",
  },
  doodle: {
    width: "160@s",
    height: "170@s",
    left: "230@s",
  },
  title: {
    width: "90%",
    left: "20@s",
    fontSize: "38@s",
    marginBottom: responsiveHeight(10)
  },
  loginButtonView: {
    paddingTop: "2@s",
    alignSelf: "center",
  },
  signInSection: {
    flexDirection: "row",
    alignSelf: "center",
  },
  signInText: {
    fontSize: "16@s",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
