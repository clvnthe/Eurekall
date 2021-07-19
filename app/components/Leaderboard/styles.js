import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  userContainer: {
    height: "80@s",
    width: "95%",
    marginTop: "10@s",
    borderRadius: "20@s",
    alignItems: "center",
    alignSelf: "center",
    elevation: 4,
  },
  innerContainer: {
    height: "80@s",
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rankTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  innerPPandTextContainer: {
    flex: 6,
    flexDirection: "row",
  },
  innerTextContainer: {
    height: "80@s",
    justifyContent: "center",
    marginLeft: "5@s",
  },
  usernameText: {
    fontSize: "24@s",
  },
  levelContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  levelCircleOutline: {
    borderRadius: "20@s",
    width: "40@s",
    height: "40@s",
    alignItems: "center",
    justifyContent: "center",
  },
  levelCircleInner: {
    width: "30@s",
    height: "30@s",
    borderRadius: "15@s",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    height: windowHeight * 0.1,
  },
  modalContainer: {
    margin: "10@s",
    padding: "6@s",
    height: windowHeight * 0.6,
    borderRadius: "20@s",
    elevation: 8,
  },
  modalInnerScrollViewContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: "20@s",
  },
  profileLvl: {
    margin: "20@s",
  },
  profileLevelCircleOutline: {
    borderRadius: "50@s",
    width: "100@s",
    height: "100@s",
    alignItems: "center",
    justifyContent: "center",
  },
  profileLevelCircleInner: {
    width: "80@s",
    height: "80@s",
    borderRadius: "40@s",
    alignItems: "center",
    justifyContent: "center",
  },
});
