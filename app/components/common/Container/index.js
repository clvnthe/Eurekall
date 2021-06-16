import React from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";

export default (props, backgroundColor) => {
  const theme = useTheme();
  if (props.scrollable) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: "200%",
          }}
          keyboardShouldPersistTaps="always"
          style={{
            paddingTop: Constants.statusBarHeight,
            backgroundColor: { backgroundColor },
            height: "100%",
            ...props.style,
          }}
          {...props}
        >
          <StatusBar style={theme.dark ? "light" : "dark"} />

          {props.children}
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  } else if (props.noPadding) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            backgroundColor: { backgroundColor },
            height: "100%",
            ...props.style,
          }}
          {...props}
        >
          <StatusBar style="dark" />
          {props.children}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            paddingTop: Constants.statusBarHeight,
            backgroundColor: { backgroundColor },
            height: "100%",
            ...props.style,
          }}
          {...props}
        >
          <StatusBar style={theme.dark ? "light" : "dark"} />
          {props.children}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
};
