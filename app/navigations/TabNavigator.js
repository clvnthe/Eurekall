import React, { useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import { useIsFocused, useTheme } from "@react-navigation/native";
import LeaderboardNavigator from "./LeaderboardNavigator";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

export const TabNavigator = () => {
  const theme = useTheme();
  const [active, setActive] = useState(false);
  const isFocused = useIsFocused();

  return (
    <Tab.Navigator
      initialRouteName="Tab"
      shifting={true}
      sceneAnimationEnabled={false}
      activeColor={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
      barStyle={{ elevation: 8 }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: "home-account",
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardNavigator}
        options={{
          tabBarIcon: "podium",
        }}
      />
    </Tab.Navigator>
  );
};
