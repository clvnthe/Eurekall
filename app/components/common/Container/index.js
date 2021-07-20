import React from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";

export default (props, backgroundColor) => {
  const windowHeight = useWindowDimensions().height;
  const theme = useTheme();
  if (props.scrollable) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.4,
            flexGrow: 1,
          }}
          //keyboardShouldPersistTaps="always"
          style={{
            paddingTop: Constants.statusBarHeight,
            backgroundColor: { backgroundColor },
            //height: "100%",
            //flex: 1,
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
        <KeyboardAvoidingView
          style={{
            backgroundColor: { backgroundColor },
            //height: "100%",
            flex: 1,
            ...props.style,
          }}
          behavior="position"
        >
          <SafeAreaView {...props}>
            <StatusBar style="dark" />
            {props.children}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            paddingTop: Constants.statusBarHeight,
            backgroundColor: { backgroundColor },
            flex: 1,
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
