import React from "react";
import { View } from "react-native";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import CompletedObjectivesScreen from "../screens/Home/ObjectivesScreens/Completed";
import OngoingObjectivesScreen from "../screens/Home/ObjectivesScreens/Ongoing";

export const ObjectivesTopTabsNavigator = ({ route }) => {
  return (
    <Tabs iconPosition="top">
      <TabScreen label="Ongoing" icon="progress-clock">
        <OngoingObjectivesScreen route={route} />
      </TabScreen>
      <TabScreen label="Completed" icon="checkbox-marked-circle-outline">
        <CompletedObjectivesScreen route={route} />
      </TabScreen>
    </Tabs>
  );
};
