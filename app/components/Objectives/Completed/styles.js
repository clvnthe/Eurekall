import { ScaledSheet } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default ScaledSheet.create({
  objectivesWrapper: {
    padding: "5@s",
    alignItems: "center",
    justifyContent: "center",
  },
  objectivesFlatListView: {
    height: "160@s",
    width: wp(95),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20@s",
    elevation: "6@s",
  },
  footer: {
    height: hp(10),
  },
  imageWrapper: {
    height: hp(45),
  },
});
