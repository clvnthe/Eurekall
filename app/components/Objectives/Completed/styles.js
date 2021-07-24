import { ScaledSheet } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default ScaledSheet.create({
  imageWrapper: {
    height: hp(45),
  },
});
