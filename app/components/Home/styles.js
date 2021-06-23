import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  title: {
    fontSize: "38rem",
    lineHeight: "39rem",
    padding: "20rem",
  },
  progressContainer: {
    top: "30rem",
    width: "340rem",
    alignSelf: "center",
    justifyContent: "center",
  },
  tierView: {
    flexDirection: "row",
    paddingBottom: "10rem",
  },
  tierTextView: {
    padding: "10rem",
    justifyContent: "space-around",
    height: "55rem",
  },
  tierTextBold: {
    fontSize: "22rem",
    fontFamily: "PoppinsBold",
  },
  tierTextLight: {
    fontSize: "13rem",
    fontFamily: "PoppinsLight",
  },
  progressTextView: {
    flexDirection: "row",
    alignSelf: "center",
    width: "96%",
    justifyContent: "space-between",
  },
  progressbarView: {
    width: "330rem",
    alignSelf: "center",
  },
  progressbar: { height: "10rem", borderRadius: "20rem" },
  decksContainer: { top: "60rem", alignSelf: "center" },
  decksSurface: {
    height: "280rem",
    width: "330rem",
    elevation: "6rem",
    borderRadius: "20rem",
    justifyContent: "center",
    opacity: "0.9rem",
    borderWidth: "1rem",
  },
  decksText: {
    fontFamily: "PoppinsRegular",
    fontSize: "32rem",
    alignSelf: "center",
  },
  decksCaption: {
    fontSize: "18rem",
    fontFamily: "PoppinsLight",
    alignSelf: "center",
  },
});
