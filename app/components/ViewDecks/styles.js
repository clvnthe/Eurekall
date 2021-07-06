import { ScaledSheet } from "react-native-size-matters";

export default ScaledSheet.create({
  doodle: {
    width: "275@s",
    top: "15%",
    flex: 1,
  },
  title: {
    fontSize: "39@s",
    textAlign: "center",
    //bottom: "230@s",
  },
  fab: {
    alignSelf: "flex-end",
    top: "80%",
    right: "5%",
    elevation: 6,
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
    height: "130@s",
  },
});
