import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  coverPic: {
    position: "absolute",
    width: "100%",
    height: "130@s",
    justifyContent: "center",
  },
  editProfileButton: {
    alignSelf: "center",
    paddingTop: "10@s",
  },
  editProfileButtonContainer: {
    height: "42@s",
    width: "105@s",
    justifyContent: "center",
    elevation: 4,
    borderRadius: "10@s",
    alignItems: "center",
    flexDirection: "row",
  },
  editProfileButtonText: {
    color: "#ffffff",
  },
  profilePic: { top: "20@s", elevation: 8, alignSelf: "center" },
  name: {
    fontSize: "26@s",
    alignSelf: "center",
    top: "20@s",
  },
  username: {
    textAlign: "center",
    top: "10@s",
  },
  title: {
    alignSelf: "center",
    fontSize: "26@s",
    top: "32@s",
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: "80@s",
    borderBottomColor: "#dddddd",
    borderBottomWidth: "1@s",
    borderTopColor: "#dddddd",
    borderTopWidth: "1@s",
    padding: "10@s",
  },
  rankContainer: {
    width: "50%",
    alignItems: "center",
    borderRightColor: "#dddddd",
    borderRightWidth: "1@s",
  },
  rank: { height: "85@s", width: "64@s" },
  rankText: { fontSize: "25@s" },
  pointsContainer: {
    width: "50%",
    alignItems: "center",
  },
  points: { height: "86@s", width: "63@s" },
  pointsText: { fontSize: "25@s" },
  bottomCoverPic: {
    position: "absolute",
    width: "100%",
    height: "10%",
    bottom: "0@s",
  },
});
