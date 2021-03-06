import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home/HomeScreen";
import {
  ANSWER,
  DECKS,
  HOME_MAIN,
  OBJECTIVES,
  OBJECTIVES_NAVIGATOR,
  POST_STUDY,
  QUESTION,
  STUDY_NAVIGATOR,
  VIEWING,
} from "../constants/routeNames";
import HeaderComponent from "../components/common/Header";
import ViewScreen from "../screens/Home/ViewScreen";
import DeckScreen from "../screens/Home/DeckScreen";
import QuestionScreen from "../screens/Home/StudyScreens/QuestionScreen";
import AnswerScreen from "../screens/Home/StudyScreens/AnswerScreen";
import PostStudyScreen from "../screens/Home/StudyScreens/PostStudyScreen";
import ObjectivesScreen from "../screens/Home/ObjectivesScreens/Ongoing";
import { ObjectivesTopTabsNavigator } from "./ObjectivesTopTabsNavigator";

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <HeaderComponent
            scene={scene}
            previous={previous}
            navigation={navigation}
          />
        ),
      }}
    >
      <HomeStack.Screen
        name={HOME_MAIN}
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name={OBJECTIVES_NAVIGATOR}
        component={ObjectivesTopTabsNavigator}
        options={{ headerTitle: "Objectives" }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name={DECKS}
        component={DeckScreen}
        options={{ headerTitle: "Decks" }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name={QUESTION}
        component={QuestionScreen}
        options={{ headerTitle: "Question" }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name={ANSWER}
        component={AnswerScreen}
        options={{ headerTitle: "Answer" }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name={POST_STUDY}
        component={PostStudyScreen}
        options={{ headerTitle: "Stats" }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name={VIEWING}
        component={ViewScreen}
        options={{ headerTitle: "Cards" }}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
