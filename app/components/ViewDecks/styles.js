import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default ScaledSheet.create({
  helpIconView: {
    height: (windowHeight * 7) / 100,
    width: (windowWidth * 95) / 100,
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: (windowHeight * 2) / 100,
    flexDirection: "row",
  },
  searchbar: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.05,
  },
  doodle: {
    width: (windowWidth * 70) / 100,
    bottom: (windowHeight * 8) / 100,
    marginLeft: (windowWidth * 8) / 100,
    flex: 1,
  },
  title: {
    fontSize: "39@s",
    textAlign: "center",
    //bottom: "230@s",
  },
  fab: {
    alignSelf: "flex-end",
    top: windowHeight * 0.82,
    right: windowWidth * 0.05,
    elevation: 6,
  },
  fabGroup: {
    paddingBottom: windowHeight * 0.1,
  },
  modal: {
    padding: "10@s",
    borderRadius: "20@s",
    borderWidth: "1@s",
    shadowOffset: { width: "1@s", height: "1@s" },
    shadowColor: "#333",
    shadowOpacity: "0.3@s",
    shadowRadius: "2@s",
    marginHorizontal: "4@s",
    marginVertical: "6@s",
    elevation: "24@s",
  },
  footer: {
    height: windowHeight * 0.45,
  },
});
