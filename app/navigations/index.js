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

import { AuthContext } from "../context/Provider";
import firebase from "firebase";
import { current } from "@reduxjs/toolkit";

const firebaseConfig = {
  apiKey: "AIzaSyAq9csfcFvRvMPS-kEjBN1IJ5iL0Sfvn2w",
  authDomain: "eurekall.firebaseapp.com",
  projectId: "eurekall",
  storageBucket: "eurekall.appspot.com",
  messagingSenderId: "132679568347",
  appId: "1:132679568347:web:5fb1b1b852eefc092cf5fe",
  measurementId: "G-H1N45TFCSX",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const firestore = firebase.firestore();
const fireauth = firebase.auth();

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
      background: "#f4fdf4", //"#DEE4E7",
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
  const [userTempDetails, setUserTempDetails] = React.useState("");

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
        const userToken = String(await fireauth.currentUser.getIdToken());
        const emailAddress = String(await fireauth.currentUser.email);
        const userRef = firestore.collection("users");
        const userData = await userRef.where("email", "==", emailAddress).get();
        const userDetails = userData["docs"][0].data();
        const nameOfUser = String(userDetails["name"]);
        const userName = String(userDetails["preferred_username"]);

        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem(
            "userInfo",
            JSON.stringify([emailAddress, nameOfUser, userName])
          );
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
      },
      logOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("userInfo");
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: "LOGOUT" });
      },
      toggleTheme: () => {
        setIsThemeDark((isThemeDark) => !isThemeDark);
      },
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
    }, 0);
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
