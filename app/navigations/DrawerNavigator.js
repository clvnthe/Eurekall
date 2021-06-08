import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { TAB_NAVIGATOR } from "../constants/routeNames";
import DrawerContent from "../components/Home/DrawerContent";
import { TabNavigator } from "./TabNavigator";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name={TAB_NAVIGATOR} component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
