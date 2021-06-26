import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  doodle: { top: "335rem", width: "300rem", height: "410rem" },
  title: {
    fontFamily: "sans-serif-thin",
    fontSize: "40rem",
    textAlign: "center",
    bottom: "250rem",
  },
  fab: {
    alignSelf: "flex-end",
    top: "614rem",
    right: "17rem",
    elevation: 6,
  },
  modal: {
    padding: "10rem",
    borderRadius: "20rem",
    borderWidth: "1rem",
    shadowOffset: { width: "1rem", height: "1rem" },
    shadowColor: "#333",
    shadowOpacity: "0.3rem",
    shadowRadius: "2rem",
    marginHorizontal: "4rem",
    marginVertical: "6rem",
    elevation: "24rem",
  },
  footer: {
    height: "100rem",
  },
});
