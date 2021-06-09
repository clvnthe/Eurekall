import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  PROFILE,
  EDIT_PROFILE,
  SETTINGS,
  TAB_NAVIGATOR,
  PROFILE_NAVIGATOR,
  SETTINGS_NAVIGATOR,
} from "../constants/routeNames";
import DrawerContent from "../components/Home/DrawerContent";
import { TabNavigator } from "./TabNavigator";
import ProfileScreen from "../screens/Home/DrawerScreens/ProfileScreen";
import EditProfileScreen from "../screens/Home/DrawerScreens/EditProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderComponent from "../components/common/Header";
import SettingsScreen from "../screens/Home/DrawerScreens/SettingsScreen";

const ProfileNavigator = () => {
  const ProfileStack = createStackNavigator();

  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
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
      <ProfileStack.Screen
        name={PROFILE}
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      ></ProfileStack.Screen>
      <ProfileStack.Screen
        name={EDIT_PROFILE}
        component={EditProfileScreen}
        options={{ headerTitle: "Edit Profile" }}
      ></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

const SettingsNavigator = () => {
  const SettingsStack = createStackNavigator();

  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
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
      <SettingsStack.Screen
        name={SETTINGS}
        component={SettingsScreen}
        options={{ headerTitle: "Settings" }}
      ></SettingsStack.Screen>
    </SettingsStack.Navigator>
  );
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name={TAB_NAVIGATOR} component={TabNavigator} />
      <Drawer.Screen name={PROFILE_NAVIGATOR} component={ProfileNavigator} />
      <Drawer.Screen name={SETTINGS_NAVIGATOR} component={SettingsNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
