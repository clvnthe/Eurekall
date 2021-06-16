import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
import Container from "../../common/Container";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import * as Decks from "../../../../store/slices/deckSlice";
import { DECKS, QUESTION } from "../../../constants/routeNames";
import Constants from "expo-constants";

function AnswerComponent({ route }) {
  const theme = useTheme();
  const decks = useSelector(Decks.getDecks);
  const index = route.params.paramIndex;
  const [studydeck, setStudydeck] = React.useState([""]);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

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
    <ScrollView style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
      <Surface
        style={[styles.answer, { backgroundColor: theme.colors.primary }]}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <Text
            style={[
              styles.answerText,
              { color: theme.dark ? theme.colors.onPrimary : "#ffffff" },
            ]}
          >
            {studydeck.length === 0
              ? ""
              : studydeck[studydeck.length - 1].answer}
          </Text>
        </ScrollView>
      </Surface>
      <Surface style={styles.userAnswer}>
        <ScrollView>
          <Text>You wrote:</Text>
          <Text>{route.params.paramUserAnswer}</Text>
        </ScrollView>
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
            color={theme.dark ? theme.colors.onPrimary : "#ffffff"}
            style={{ alignSelf: "center" }}
            size={40}
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#F26C68" }]}
          onPress={() => {
            dispatch(Decks.shiftItemToFrontStudydeck(index));
            navigate(QUESTION, { paramIndex: index });
            console.log("Wrong Answer!");
          }}
        >
          <Icon
            name="close-outline"
            color={theme.dark ? theme.colors.onPrimary : "#ffffff"}
            style={{ alignSelf: "center" }}
            size={40}
          ></Icon>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default AnswerComponent;

const styles = StyleSheet.create({
  answer: {
    width: 330,
    height: 300,
    alignSelf: "center",
    elevation: 8,
    justifyContent: "center",
    padding: 10,
  },
  userAnswer: {
    width: 330,
    height: 130,
    alignSelf: "center",
    elevation: 8,
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
