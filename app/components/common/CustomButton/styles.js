import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  wrapper: {
    height: 51,
    marginVertical: 5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "340rem",
  },
  inputContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    flex: 1,
  },
  loadingSection: {
    flexDirection: "row",
  },
});
