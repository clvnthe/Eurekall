import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home/HomeScreen";
import { HOME_MAIN, LEADERBOARD, VIEWING } from "../constants/routeNames";
import HeaderComponent from "../components/common/Header";
import ViewScreen from "../screens/Home/ViewScreen";
import LeaderboardScreen from "../screens/Home/LeaderboardScreen";

const LeaderboardNavigator = () => {
  const LeaderboardStack = createStackNavigator();

  return (
    <LeaderboardStack.Navigator
      initialRouteName="Leaderboard"
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
      <LeaderboardStack.Screen
        name={LEADERBOARD}
        component={LeaderboardScreen}
        options={{ headerTitle: "Leaderboard" }}
      ></LeaderboardStack.Screen>
    </LeaderboardStack.Navigator>
  );
};

export default LeaderboardNavigator;
