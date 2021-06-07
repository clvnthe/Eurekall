import { StyleSheet } from "react-native";
import colors from "../../../../assets/theme/colors";

export default StyleSheet.create({
  wrapper: {
    height: 42,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  inputContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    flex: 1,
  },
  error: {
    color: colors.danger,
  },
});
