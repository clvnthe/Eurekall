import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  PROFILE,
  EDIT_PROFILE,
  TAB_NAVIGATOR,
  PROFILE_NAVIGATOR,
} from "../constants/routeNames";
import DrawerContent from "../components/Home/DrawerContent";
import { TabNavigator } from "./TabNavigator";
import ProfileScreen from "../screens/Home/DrawerScreens/ProfileScreen";
import EditProfileScreen from "../screens/Home/DrawerScreens/EditProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderComponent from "../components/common/Header";

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

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      minSwipeDistance={10}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name={TAB_NAVIGATOR} component={TabNavigator} />
      <Drawer.Screen name={PROFILE_NAVIGATOR} component={ProfileNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
