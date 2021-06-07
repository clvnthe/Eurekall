import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home/HomeScreen";
import { HOME_MAIN } from "../constants/routeNames";
import HeaderComponent from "../components/common/Header";

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <HeaderComponent title={"Home"} {...props} />,
      }}
    >
      <HomeStack.Screen
        name={HOME_MAIN}
        component={HomeScreen}
        screenOptions={{ header: (name) => <HeaderComponent title={name} /> }}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
