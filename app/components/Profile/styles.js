import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  coverPic: {
    position: "absolute",
    width: "100%",
    height: "130rem",
    justifyContent: "center",
  },
  editProfileButton: {
    alignSelf: "center",
    paddingTop: "10rem",
  },
  editProfileButtonContainer: {
    height: "42rem",
    width: "105rem",
    justifyContent: "center",
    elevation: 4,
    borderRadius: "10rem",
    alignItems: "center",
    flexDirection: "row",
  },
  editProfileButtonText: {
    color: "#ffffff",
  },
  profilePic: { top: "20rem", elevation: 8, alignSelf: "center" },
  name: {
    fontSize: "26rem",
    alignSelf: "center",
    top: "20rem",
  },
  username: {
    textAlign: "center",
    top: "10rem",
  },
  title: {
    alignSelf: "center",
    fontSize: "26rem",
    top: "32rem",
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: "80rem",
    borderBottomColor: "#dddddd",
    borderBottomWidth: "1rem",
    borderTopColor: "#dddddd",
    borderTopWidth: "1rem",
    padding: "10rem",
  },
  rankContainer: {
    width: "50%",
    alignItems: "center",
    borderRightColor: "#dddddd",
    borderRightWidth: "1rem",
  },
  rank: { height: "85rem", width: "64rem" },
  rankText: { fontSize: "25rem" },
  pointsContainer: {
    width: "50%",
    alignItems: "center",
  },
  points: { height: "86rem", width: "63rem" },
  pointsText: { fontSize: "25rem" },
  bottomCoverPic: {
    position: "absolute",
    width: "100%",
    height: "10%",
    bottom: "0rem",
  },
});
