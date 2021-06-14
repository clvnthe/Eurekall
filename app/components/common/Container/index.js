import React from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "react-native-paper";

export default (props, backgroundColor) => {
  const theme = useTheme();
  if (props.scrollable) {
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
          <ScrollView
            contentContainerStyle={{
              paddingBottom: "200%",
            }}
            keyboardShouldPersistTaps="always"
          >
            {props.children}
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  } else if (props.noPadding) {
    return (
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
