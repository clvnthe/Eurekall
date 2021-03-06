import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginHomeScreen from "../screens/Login/LoginHomeScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import RegisterScreen from "../screens/Login/RegisterScreen";
import ForgotPasswordScreen from "../screens/Login/ForgotPasswordScreen";
import ConfirmRegistrationScreen from "../screens/Login/ConfirmRegistrationScreen";
import ResetPasswordScreen from "../screens/Login/ResetPasswordScreen";
import {
  LOGIN,
  REGISTER,
  FORGOTPASSWORD,
  CONFIRM_REGISTRATION,
  RESETPASSWORD,
  LOGIN_HOME,
} from "../constants/routeNames";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen
          name={LOGIN_HOME}
          component={LoginHomeScreen}
        ></AuthStack.Screen>
        <AuthStack.Screen
          name={LOGIN}
          component={LoginScreen}
        ></AuthStack.Screen>
        <AuthStack.Screen
          name={REGISTER}
          component={RegisterScreen}
        ></AuthStack.Screen>
        <AuthStack.Screen
          name={CONFIRM_REGISTRATION}
          component={ConfirmRegistrationScreen}
        ></AuthStack.Screen>
        <AuthStack.Screen
          name={FORGOTPASSWORD}
          component={ForgotPasswordScreen}
        ></AuthStack.Screen>
        <AuthStack.Screen
          name={RESETPASSWORD}
          component={ResetPasswordScreen}
        ></AuthStack.Screen>
      </AuthStack.Navigator>
    </View>
  );
};

export default AuthNavigator;
