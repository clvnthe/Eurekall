import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LEADERBOARD } from "../constants/routeNames";
import HeaderComponent from "../components/common/Header";
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
