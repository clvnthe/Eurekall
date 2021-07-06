import EStyleSheet from "react-native-extended-stylesheet";
import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  logoView: {
    //top: "20%",
    height: "50%",
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "310@s",
    alignSelf: "center",
  },
  logo: {
    width: "82%",
    height: "75@s",
    //right: "40@s",
    //top: "150@s",
    //alignSelf: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "110%",
  },
  doodleView: {
    //top: "20%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  doodle: {
    width: "200@s",
    flex: 1,
    //top: "20%",
  },
  title: {
    fontSize: "55@s",
    //left: "20@s",
    lineHeight: "58@s",
    //top: "150@s",
  },
  buttonView: {
    alignSelf: "center",
    justifyContent: "center",
  },
});
