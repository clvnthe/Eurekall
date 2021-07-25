import { ScaledSheet } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default ScaledSheet.create({
  title: {
    //fontSize: "36@s",
    //height: "100%",
    //lineHeight: "38@s",
    padding: hp(3),
  },
  welcomeHomeView: {
    marginTop: hp(-4.5), //"-25@s",
  },
  progressContainer: {
    //top: "20@s",
    width: "320@s",
    alignSelf: "center",
    flex: 1,
  },
  tierView: {
    flexDirection: "row",
    paddingBottom: "10@s",
  },
  tierTextView: {
    padding: "10@s",
    justifyContent: "space-around",
    height: "55@s",
  },
  tierTextBold: {
    fontSize: "21@s",
    fontFamily: "PoppinsBold",
  },
  tierTextLight: {
    fontSize: "12@s",
    fontFamily: "PoppinsLight",
  },
  progressTextView: {
    flexDirection: "row",
    alignSelf: "center",
    width: "96%",
    justifyContent: "space-between",
  },
  levelWrapper: {
    width: wp(15),
    height: hp(3),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  levelUpWrapper: {
    height: hp(3),
    //bottom: Platform.OS === "ios" ? hp(2) : hp(3),
  },
  progressbarView: {
    width: "310@s",
    alignSelf: "center",
  },
  progressbar: { height: "9@s", borderRadius: "20@s" },
  objectivesView: {
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: "10@s",
    paddingBottom: "10@s",
    //marginLeft: "20@s",
  },
  objectivesText: {
    marginLeft: "20@s",
  },
  objectivesFlatListView: {
    height: "160@s",
    width: "142@s",
    marginRight: "20@s",
    marginTop: "10@s",
    marginBottom: "10@s",
    marginLeft: "20@s",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20@s",
    elevation: "6@s",
  },
  objectivesFlatListName: {
    textAlign: "center",
    padding: "10@s",
  },
  objectivesTouchableOpacity: {
    height: "25%",
    width: "50%",
    borderRadius: "20@s",
    justifyContent: "center",
    alignItems: "center",
  },
  decksView: {
    flex: 3,
    justifyContent: "center",
    alignSelf: "center",
    width: "310@s",
  },
  decksTitle: {
    paddingBottom: "10@s",
  },
  decksContainer: { alignSelf: "center" },
  decksSurface: {
    height: "160@s",
    width: "310@s",
    elevation: "6@s",
    borderRadius: "20@s",
    justifyContent: "center",
    opacity: "0.9@s",
    borderWidth: "1@s",
  },
  decksText: {
    fontSize: "31@s",
    alignSelf: "center",
    textAlign: "center",
  },
  decksCaption: {
    fontSize: "17@s",
    fontFamily: "PoppinsLight",
    alignSelf: "center",
  },
});
