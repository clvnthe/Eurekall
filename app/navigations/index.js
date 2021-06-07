import React, { useContext, useEffect } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import merge from "deepmerge";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../src/aws-exports";
import { AuthContext } from "../context/Provider";

Amplify.configure(awsconfig);

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const AppNavContainer = () => {
  const CustomDefaultTheme = {
    ...CombinedDefaultTheme,
    colors: {
      ...CombinedDefaultTheme.colors,
      primary: "#28A44B",
      primaryVariant: "#5DB075",
      secondary: "#98237c",
      background: "#DEE4E7",
      text: "#333333",
    },
  };

  const CustomDarkTheme = {
    ...CombinedDarkTheme,
    colors: {
      ...CombinedDarkTheme.colors,
      primary: "#9ed9aa",
      primaryVariant: "#5DB075",
      secondary: "#d591bd",
      background: "#121212",
      text: "#ffffff",
      surface: "#121212",
      onPrimary: "#000000",
    },
  };

  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CustomDarkTheme : CustomDefaultTheme;

  const initialLoginState = {
    isLoggedIn: false,
    email: null,
    name: null,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoggedIn: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          email: action.email,
          name: action.name,
          userName: action.id,
          userToken: action.token,
          isLoggedIn: true,
        };
      case "LOGOUT":
        return {
          ...prevState,
          email: null,
          name: null,
          userName: null,
          userToken: null,
          isLoggedIn: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      logIn: async () => {
        const user = await Auth.currentAuthenticatedUser();
        const userToken = String(
          user["signInUserSession"]["accessToken"]["jwtToken"]
        );
        const emailAddress = String(user["attributes"]["email"]);
        const nameOfUser = String(user["attributes"]["name"]);
        const userName = String(user["attributes"]["preferred_username"]);

        try {
          await AsyncStorage.setItem("userToken", userToken);
        } catch (err) {
          console.log(err);
        }
        dispatch({
          type: "LOGIN",
          email: emailAddress,
          name: nameOfUser,
          id: userName,
          token: userToken,
        });
        console.log(
          "email:",
          loginState.email,
          "\n",
          "name:",
          loginState.name,
          "\n",
          "username:",
          loginState.userName,
          "\n",
          "token:",
          loginState.userToken
        );
      },
      logOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: "LOGOUT" });
        console.log(
          "email:",
          loginState.email,
          "\n",
          "name:",
          loginState.name,
          "\n",
          "username:",
          loginState.userName
        );
      },
      toggleTheme: () => {
        setIsThemeDark((isThemeDark) => !isThemeDark);
      },
      loginState,
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (err) {
        console.log(err);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <DrawerNavigator />
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      </PaperProvider>
    </AuthContext.Provider>
  );
};

export default AppNavContainer;
