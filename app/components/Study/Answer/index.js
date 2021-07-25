import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import * as Decks from "../../../../store/slices/deckSlice";
import { DECKS, POST_STUDY, QUESTION } from "../../../constants/routeNames";
import Constants from "expo-constants";
import EStyleSheet from "react-native-extended-stylesheet";
import { useFonts } from "expo-font";
import LottieView from "lottie-react-native";

function AnswerComponent({ route }) {
  const theme = useTheme();
  const decks = useSelector(Decks.getDecks);
  const index = route.params.paramIndex;
  const [studydeck, setStudydeck] = React.useState([""]);
  const [allDone, setAllDone] = React.useState(false);
  const { navigate } = useNavigation();
  const { reset } = useNavigation();
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

  //for animation
  useEffect(() => {
    setTimeout(
      () =>
        allDone
          ? reset({
              index: 0,
              routes: [
                {
                  name: POST_STUDY,
                  params: {
                    statsTracker: route.params.statsTracker,
                    studyAll: route.params.studyAll,
                  },
                },
              ],
            })
          : console.log("allDone is false"),
      1000
    );
  }, [allDone]);

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

  if (allDone) {
    return (
      <LottieView
        source={require("../../../../assets/lottieAnimations/1798-check-animation.json")}
        autoPlay
        loop={false}
      />
    );
  }

  if (route.params.studyAll) {
    const curDeck = route.params.curDeck;
    const curCard = curDeck.cards[curDeck.cards.length - 1];

    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          flex: 1,
          marginBottom: 10,
        }}
      >
        <Surface
          style={[styles.answer, { backgroundColor: theme.colors.primary }]}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <Text
              style={[
                styles.answerText,
                {
                  color: theme.dark ? theme.colors.onPrimary : "#ffffff",
                  fontFamily: "PoppinsMedium",
                },
              ]}
            >
              {curCard.answer}
            </Text>
          </ScrollView>
        </Surface>
        <Surface style={styles.userAnswer}>
          <ScrollView>
            <Text style={{ fontFamily: "PoppinsMedium" }}>You wrote:</Text>
            <Text style={{ fontFamily: "PoppinsRegular" }}>
              {route.params.paramUserAnswer}
            </Text>
          </ScrollView>
        </Surface>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              const tempDeck = {
                cards: curDeck.cards.slice(0, curDeck.cards.length - 1),
              };
              tempDeck.cards.length === 0
                ? setAllDone(true)
                : reset({
                    index: 1,
                    routes: [
                      {
                        name: DECKS,
                      },
                      {
                        name: QUESTION,
                        params: {
                          paramIndex: index,
                          //cardIndex: route.params.cardIndex + 1,
                          curDeck: tempDeck,
                          studyAll: true,
                          statsTracker: route.params.statsTracker,
                        },
                      },
                    ],
                  });
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
              const tempDeck = {
                cards: [curDeck.cards[curDeck.cards.length - 1]].concat(
                  curDeck.cards.filter(
                    (card) => card !== curDeck.cards[curDeck.cards.length - 1]
                  )
                ),
              };
              ++route.params.statsTracker[
                decks[index].cards.findIndex((card) => curCard.id === card.id)
              ].numOfTries;
              reset({
                index: 1,
                routes: [
                  {
                    name: DECKS,
                  },
                  {
                    name: QUESTION,
                    params: {
                      paramIndex: index,
                      //cardIndex: route.params.cardIndex,
                      curDeck: tempDeck,
                      studyAll: true,
                      statsTracker: route.params.statsTracker,
                    },
                  },
                ],
              });
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
      </View>
    );
  } else {
    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          flex: 1,
          marginBottom: 10,
        }}
      >
        <Surface
          style={[styles.answer, { backgroundColor: theme.colors.primary }]}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <Text
              style={[
                styles.answerText,
                {
                  color: theme.dark ? theme.colors.onPrimary : "#ffffff",
                  fontFamily: "PoppinsMedium",
                },
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
            <Text style={{ fontFamily: "PoppinsMedium" }}>You wrote:</Text>
            <Text style={{ fontFamily: "PoppinsRegular" }}>
              {route.params.paramUserAnswer}
            </Text>
          </ScrollView>
        </Surface>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              dispatch(Decks.popStudydeck(index));
              {
                studydeck.length - 1 === 0
                  ? setAllDone(true)
                  : reset({
                      index: 1,
                      routes: [
                        {
                          name: DECKS,
                        },
                        {
                          name: QUESTION,
                          params: {
                            paramIndex: index,
                            statsTracker: route.params.statsTracker,
                            studydeckCopy: route.params.studydeckCopy,
                          },
                        },
                      ],
                    });
                /*navigate(QUESTION, {
                      paramIndex: index,
                      statsTracker: route.params.statsTracker,
                      studydeckCopy: route.params.studydeckCopy,
                    });*/
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
              ++route.params.statsTracker[
                route.params.studydeckCopy.findIndex(
                  (card) => studydeck[studydeck.length - 1].id === card.id
                )
              ].numOfTries;
              reset({
                index: 1,
                routes: [
                  {
                    name: DECKS,
                  },
                  {
                    name: QUESTION,
                    params: {
                      paramIndex: index,
                      statsTracker: route.params.statsTracker,
                      studydeckCopy: route.params.studydeckCopy,
                    },
                  },
                ],
              });
              /*navigate(QUESTION, {
                paramIndex: index,
                statsTracker: route.params.statsTracker,
                studydeckCopy: route.params.studydeckCopy,
              });*/
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
      </View>
    );
  }
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
    fontSize: "25rem",
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
