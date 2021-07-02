import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  title: {
    fontSize: "36@s",
    lineHeight: "38@s",
    padding: "18@s",
  },
  progressContainer: {
    top: "20@s",
    width: "320@s",
    alignSelf: "center",
    justifyContent: "center",
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
  progressbarView: {
    width: "310@s",
    alignSelf: "center",
  },
  progressbar: { height: "9@s", borderRadius: "20@s" },
  decksContainer: { top: "40@s", alignSelf: "center" },
  decksSurface: {
    height: "270@s",
    width: "310@s",
    elevation: "6@s",
    borderRadius: "20@s",
    justifyContent: "center",
    opacity: "0.9@s",
    borderWidth: "1@s",
  },
  decksText: {
    fontFamily: "PoppinsRegular",
    fontSize: "31@s",
    alignSelf: "center",
  },
  decksCaption: {
    fontSize: "17@s",
    fontFamily: "PoppinsLight",
    alignSelf: "center",
  },
});
