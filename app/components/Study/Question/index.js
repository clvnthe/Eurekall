import {
  useNavigation,
  useTheme,
  useIsFocused,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { ANSWER } from "../../../constants/routeNames";
import CustomButton from "../../common/CustomButton";
import * as Decks from "../../../../store/slices/deckSlice";
import Constants from "expo-constants";
import EStyleSheet from "react-native-extended-stylesheet";
import { useFonts } from "expo-font";

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

  const [loaded] = useFonts({
    MontserratLight: require("../../../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../../../assets/fonts/Montserrat-Bold.ttf"),
    PoppinsMedium: require("../../../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../../../assets/fonts/Poppins-Light.ttf"),
    PoppinsThin: require("../../../../assets/fonts/Poppins-Thin.ttf"),
    PoppinsRegular: require("../../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  if (route.params.studyAll) {
    const statsTracker =
      typeof route.params.statsTracker !== "undefined"
        ? route.params.statsTracker
        : new Array(decks[route.params.paramIndex].cards.length);

    if (typeof route.params.statsTracker === "undefined") {
      for (let i = 0; i < decks[route.params.paramIndex].cards.length; i++) {
        statsTracker[i] = {
          id: (decks[route.params.paramIndex].cards.length - i).toString(),
          cardNumber: (
            decks[route.params.paramIndex].cards.length - i
          ).toString(),
          numOfTries: "1",
        };
      }
    }

    const curDeck =
      typeof route.params.curDeck !== "undefined"
        ? route.params.curDeck
        : decks[route.params.paramIndex];
    const curCard = curDeck.cards[curDeck.cards.length - 1];

    return (
      <KeyboardAvoidingView
        style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}
        behavior="position"
      >
        <ScrollView>
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
                    fontFamily: "PoppinsMedium",
                  },
                ]}
              >
                {curCard.question}
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
          <View style={{ alignItems: "center" }}>
            <CustomButton
              title="Submit"
              //width={165}
              onPress={() => {
                if (userAnswer !== "") {
                  navigate(ANSWER, {
                    paramIndex: route.params.paramIndex,
                    //cardIndex: route.params.cardIndex,
                    paramUserAnswer: userAnswer,
                    curDeck: curDeck,
                    studyAll: true,
                    statsTracker: statsTracker,
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
      </KeyboardAvoidingView>
    );
  } else {
    const statsTracker =
      typeof route.params.statsTracker !== "undefined"
        ? route.params.statsTracker
        : new Array(studydeck.length);

    if (typeof route.params.statsTracker === "undefined") {
      for (let i = 0; i < studydeck.length; i++) {
        statsTracker[i] = {
          id: (studydeck.length - i).toString(),
          cardNumber: (studydeck.length - i).toString(),
          numOfTries: "1",
        };
      }
    }

    return (
      <KeyboardAvoidingView
        style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}
        behavior="position"
      >
        <ScrollView>
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
                    fontFamily: "PoppinsMedium",
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
          <View style={{ alignItems: "center" }}>
            <CustomButton
              title="Submit"
              //width={165}
              onPress={() => {
                if (userAnswer !== "") {
                  navigate(ANSWER, {
                    paramIndex: route.params.paramIndex,
                    paramUserAnswer: userAnswer,
                    statsTracker: statsTracker,
                    studydeckCopy:
                      typeof route.params.studydeckCopy === "undefined"
                        ? studydeck
                        : route.params.studydeckCopy,
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
      </KeyboardAvoidingView>
    );
  }
}

export default QuestionComponent;

const styles = EStyleSheet.create({
  question: {
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
  },
  questionText: {
    textAlign: "center",
    fontSize: "25rem",
  },
  userAnswerTextInput: { width: "320rem", alignSelf: "center" },
});
