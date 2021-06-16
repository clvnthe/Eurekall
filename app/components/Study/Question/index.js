import {
  useNavigation,
  useTheme,
  useIsFocused,
} from "@react-navigation/native";
import React, { useEffect, useCallback } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { ANSWER } from "../../../constants/routeNames";
import Container from "../../common/Container";
import CustomButton from "../../common/CustomButton";
import * as Decks from "../../../../store/slices/deckSlice";
import Constants from "expo-constants";

function QuestionComponent({ route }) {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const decks = useSelector(Decks.getDecks);
  const [studydeck, setStudydeck] = React.useState([""]);
  //const studydeck = useCallback(() => decks[route.params.paramIndex].studydeck);
  const [userAnswer, setUserAnswer] = React.useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(async () => {
      let tempstudydeck;
      tempstudydeck = null;
      try {
        tempstudydeck = decks[route.params.paramIndex].studydeck;
      } catch (err) {
        console.log(err);
      }
      setStudydeck(tempstudydeck);
    }, 0);
  }, [isFocused]);

  return (
    <ScrollView style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
      <Surface
        style={[styles.question, { backgroundColor: theme.colors.primary }]}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <Text
            style={[
              styles.questionText,
              {
                color: theme.dark ? theme.colors.onPrimary : "#ffffff",
              },
            ]}
          >
            {studydeck.length === 0
              ? ""
              : studydeck[studydeck.length - 1].question}
          </Text>
        </ScrollView>
      </Surface>
      <Surface style={styles.userAnswer}>
        <TextInput
          theme={{ roundness: 20 }}
          mode="flat"
          label="Answer"
          value={userAnswer}
          onChangeText={setUserAnswer}
          style={styles.userAnswerTextInput}
          left={
            <TextInput.Icon
              name="alpha-a-box-outline"
              color={userAnswer ? theme.colors.primary : theme.colors.text}
            />
          }
        ></TextInput>
      </Surface>
      <View style={{ alignItems: "flex-end" }}>
        <CustomButton
          title="Submit"
          width={165}
          onPress={() => {
            if (userAnswer !== "") {
              navigate(ANSWER, {
                paramIndex: route.params.paramIndex,
                paramUserAnswer: userAnswer,
              });
              setUserAnswer("");
            } else {
              Alert.alert("Alert", "Please enter an answer :)", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
            }
          }}
        ></CustomButton>
      </View>
    </ScrollView>
  );
}

export default QuestionComponent;

const styles = StyleSheet.create({
  question: {
    width: 330,
    height: 300,
    alignSelf: "center",
    elevation: 8,
    justifyContent: "center",
    padding: 10,
    flex: 1,
  },
  userAnswer: {
    width: 330,
    height: 130,
    alignSelf: "center",
    elevation: 8,
    justifyContent: "center",
  },
  questionText: {
    textAlign: "center",
    fontSize: 30,
  },
  userAnswerTextInput: { width: 310, alignSelf: "center" },
});
