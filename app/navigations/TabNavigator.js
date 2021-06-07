import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import { useTheme } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();

export const TabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Tab"
      shifting={true}
      sceneAnimationEnabled={false}
      activeColor={theme.dark ? theme.colors.primary : theme.colors.onPrimary}
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
        component={HomeNavigator}
        options={{
          tabBarIcon: "trophy-outline",
        }}
      />
    </Tab.Navigator>
  );
};
