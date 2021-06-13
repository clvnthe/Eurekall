import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
import Container from "../../common/Container";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import * as Decks from "../../../../store/slices/deckSlice";
import { DECKS, QUESTION } from "../../../constants/routeNames";

function AnswerComponent({ route }) {
  const theme = useTheme();
  const decks = useSelector(Decks.getDecks);
  const index = route.params.paramIndex;
  const [studydeck, setStudydeck] = React.useState([""]);
  //const studydeck = decks[route.params.paramIndex].studydeck;
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  /*const popStudydeckHandler = () => {
    dispatch(Decks.popStudydeck());
  };*/

  useEffect(() => {
    setTimeout(async () => {
      let tempstudydeck;
      tempstudydeck = null;
      try {
        tempstudydeck = decks[index].studydeck;
      } catch (err) {
        console.log(err);
      }
      setStudydeck(tempstudydeck);
    }, 0);
  }, []);

  return (
    <Container>
      <Surface
        style={[styles.answer, { backgroundColor: theme.colors.primary }]}
      >
        <Text style={styles.answerText}>
          {studydeck.length === 0 ? "" : studydeck[studydeck.length - 1].answer}
        </Text>
      </Surface>
      <Surface style={styles.userAnswer}>
        <Text>You wrote:</Text>
        <Text>{route.params.paramUserAnswer}</Text>
      </Surface>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => {
            dispatch(Decks.popStudydeck(index));
            {
              studydeck.length - 1 === 0
                ? navigate(DECKS)
                : navigate(QUESTION, { paramIndex: index });
            }
            console.log("Correct Answer!");
          }}
        >
          <Icon
            name="check-outline"
            color="#ffffff"
            style={{ alignSelf: "center" }}
            size={40}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#F26C68" }]}
          onPress={() => {
            dispatch(Decks.popStudydeck(index));
            {
              studydeck.length - 1 === 0
                ? navigate(DECKS)
                : navigate(QUESTION, { paramIndex: index });
            }
            console.log("Wrong Answer!");
          }}
        >
          <Icon
            name="close-outline"
            color="#ffffff"
            style={{ alignSelf: "center" }}
            size={40}
          ></Icon>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

export default AnswerComponent;

const styles = StyleSheet.create({
  answer: {
    width: 330,
    height: 300,
    alignSelf: "center",
    elevation: 4,
    justifyContent: "center",
    padding: 10,
  },
  userAnswer: {
    width: 330,
    height: 130,
    alignSelf: "center",
    elevation: 4,
    justifyContent: "center",
    padding: 10,
  },
  answerText: {
    textAlign: "center",
    fontSize: 30,
    color: "#ffffff",
  },
  buttonsContainer: {
    width: 330,
    alignSelf: "center",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 160,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
  },
});
