import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
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
  profilePic: {
    //top: "20@s",
    elevation: 8,
    alignSelf: "center",
    borderWidth: 1,
    overflow: "hidden",
  },
  name: {
    fontSize: "26@s",
    alignSelf: "center",
    marginBottom: "-5@s",
    //top: "20@s",
  },
  username: {
    textAlign: "center",
    //top: "10@s",
  },
  titleText: {
    textAlign: "center",
  },
  levelText: {
    textAlign: "center",
  },

  title: {
    alignSelf: "center",
    fontSize: "26@s",
    //top: "32@s",
  },
  description: {
    textAlign: "center",
    fontSize: "20@s",
    //top: "32@s",
  },
});
