import EStyleSheet from "react-native-extended-stylesheet";
import { ScaledSheet } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default ScaledSheet.create({
  logoView: {
    //top: "20%",
    height: hp(50),
    flexDirection: "column",
    justifyContent: "flex-end",
    width: wp(85),
    alignSelf: "center",
    alignItems: "flex-start",
  },
  logo: {
    width: wp(75),
    height: hp(13),
    //right: "40@s",
    //top: "150@s",
    //alignSelf: "center",
  },
  backgroundImage: {
    //width: wp(100),
    //height: hp(110),
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined,
  },
  doodleView: {
    //top: "20%",
    flex: 1,
    //justifyContent: "flex-end",
  },
  doodle: {
    height: undefined, //hp(40),
    width: undefined, //wp(60), //"200@s",
    flex: 1,
    right: wp(20),
    top: hp(5),
  },
  title: {
    fontSize: hp(8), //"55@s",
    width: wp(80),
    //left: "20@s",
    lineHeight: hp(8), //"58@s",
    //top: "150@s",
  },
  buttonView: {
    alignSelf: "center",
    justifyContent: "center",
  },
});
