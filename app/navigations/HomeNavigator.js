import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home/HomeScreen";
import { HOME_MAIN, VIEWING } from "../constants/routeNames";
import HeaderComponent from "../components/common/Header";
import ViewScreen from "../screens/Home/ViewScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

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
        name={VIEWING}
        component={ViewScreen}
        options={{ headerTitle: "View Cards" }}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
