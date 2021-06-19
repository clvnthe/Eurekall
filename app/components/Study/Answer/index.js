import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import * as Decks from "../../../../store/slices/deckSlice";
import { DECKS, QUESTION } from "../../../constants/routeNames";
import Constants from "expo-constants";
import EStyleSheet from "react-native-extended-stylesheet";

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

const styles = EStyleSheet.create({
  answer: {
    width: "350rem",
    height: "320rem",
    alignSelf: "center",
    elevation: "8rem",
    justifyContent: "center",
    padding: "10rem",
    flex: 1,
  },
  userAnswer: {
    width: "350rem",
    height: "135rem",
    alignSelf: "center",
    elevation: "8rem",
    justifyContent: "center",
    padding: "10rem",
  },
  answerText: {
    textAlign: "center",
    fontSize: "35rem",
    color: "#ffffff",
  },
  buttonsContainer: {
    width: "350rem",
    alignSelf: "center",
    paddingTop: "10rem",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "170rem",
    height: "80rem",
    borderRadius: "10rem",
    justifyContent: "center",
  },
});
