import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

import { CONFIRM_REGISTRATION, LOGIN } from "../../constants/routeNames";
import Container from "../common/Container";
import CustomButton from "../common/CustomButton";
import styles from "./styles";
import colors from "../../../assets/theme/colors";

import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase";

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

function RegisterComponent() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const emailTextInput = React.useRef();
  const usernameTextInput = React.useRef();
  const passwordTextInput = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const hasText = (text) => {
    return text.length > 0 && text.length < 6;
  };

  // For firebase registration
  async function signUp() {
    try {
      setLoading(true);
      const docRef = firestore.collection("users").doc(email);
      const userDetails = await fireauth.createUserWithEmailAndPassword(
        email,
        password
      );
      await firebase.auth().currentUser.sendEmailVerification();
      await docRef.set({
        email: email,
        preferred_username: username,
        name: name,
        decks: [],
      });
      setIsSignInHelperTextVisible(false);
      setLoading(false);
      setName(""); //reset fields
      setUsername(""); //reset fields
      setEmail(""); //reset fields
      setPassword(""); //reset fields
      console.log("successful signup");
      alert("please verify your account from your email");
      navigate(CONFIRM_REGISTRATION);
    } catch (error) {
      setIsSignInHelperTextVisible(true);
      console.log("error signing up:", error);
      setLoading(false);
    }
  }

  //FOR ERROR MESSAGES*********************/START
  const [isHelperTextVisible, setIsHelperTextVisible] = React.useState(false);
  const [isSignInHelperTextVisible, setIsSignInHelperTextVisible] =
    React.useState(false);

  const hasErrors = (text) => {
    if (text.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const emailHasErrors = (text) => {
    return text.length == 0 || !text.includes("@");
  };

  const passwordHasErrors = (text) => {
    if (text.length == 0) {
      return true;
    } else if (text.length < 6) {
      return true;
    } else {
      return false;
    }
  };

  const getNameErrorMessage = () => {
    return "Name is required!";
  };

  const getEmailErrorMessage = (text) => {
    if (text.length === 0) {
      return "Email is required!";
    } else {
      return "Email is invalid!";
    }
  };

  const getUsernameErrorMessage = () => {
    return "Username is required!";
  };

  const getPasswordErrorMessage = (text) => {
    if (text.length === 0) {
      return "Password is required!";
    } else {
      return "Password is invalid!";
    }
  };
  //FOR ERROR MESSAGES*********************/END

  const { navigate } = useNavigation();

  return (
    <Container scrollable backgroundColor={theme.colors.background}>
      <View style={styles.logoView}>
        <Image
          style={styles.logo}
          source={
            theme.dark
              ? require("../../../assets/images/eurekall_whitelogo_cropped.png")
              : require("../../../assets/images/eurekall_logo_cropped.png")
          }
          resizeMode="contain"
        ></Image>
      </View>
      <View style={styles.titleView}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
              fontFamily:
                Platform.OS === "android"
                  ? "sans-serif-thin"
                  : "HelveticaNeue-Thin",
            },
          ]}
        >
          Register here
        </Text>
        <Image
          style={styles.doodle}
          source={require("../../../assets/images/registerdoodle.png")}
        ></Image>
      </View>
      <View style={styles.inputView}>
        <TextInput
          theme={{ roundness: 20 }}
          mode="flat"
          label="Your name"
          placeholder="Enter your name"
          style={styles.nameTextInput}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => emailTextInput.current.focus()}
          blurOnSubmit={false}
          left={
            <TextInput.Icon
              name="account"
              color={name ? theme.colors.primary : theme.colors.text}
            />
          }
          error={isHelperTextVisible ? hasErrors(name) : false}
        />
        <HelperText
          style={styles.nameHelperText}
          type="error"
          visible={isHelperTextVisible ? hasErrors(name) : false}
        >
          {getNameErrorMessage()}
        </HelperText>
        <TextInput
          ref={emailTextInput}
          theme={{ roundness: 20 }}
          mode="flat"
          label="Email address"
          placeholder="e.g., abc@xyz.com"
          keyboardType="email-address"
          style={styles.emailTextInput}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => usernameTextInput.current.focus()}
          blurOnSubmit={false}
          left={
            <TextInput.Icon
              name="at"
              color={email ? theme.colors.primary : theme.colors.text}
            />
          }
          error={isHelperTextVisible ? emailHasErrors(email) : false}
        />
        <View
          style={{
            height: "7%",
            width: "100%",
          }}
        >
          <HelperText
            style={styles.emailHelperText}
            type="error"
            visible={isHelperTextVisible ? emailHasErrors(email) : false}
          >
            {getEmailErrorMessage(email)}
          </HelperText>
          <HelperText
            style={styles.emailHelperText}
            type="error"
            visible={!emailHasErrors(email) ? isSignInHelperTextVisible : false}
          >
            Email already exists!
          </HelperText>
        </View>
        <TextInput
          ref={usernameTextInput}
          theme={{ roundness: 20 }}
          mode="flat"
          label="Username"
          placeholder="Enter username"
          style={styles.usernameTextInput}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordTextInput.current.focus()}
          blurOnSubmit={false}
          left={
            <TextInput.Icon
              name="face-profile"
              color={username ? theme.colors.primary : theme.colors.text}
            />
          }
          error={isHelperTextVisible ? hasErrors(username) : false}
        />
        <HelperText
          style={styles.usernameHelperText}
          type="error"
          visible={isHelperTextVisible ? hasErrors(username) : false}
        >
          {getUsernameErrorMessage()}
        </HelperText>
        <TextInput
          ref={passwordTextInput}
          theme={{ roundness: 20 }}
          mode="flat"
          label="Password"
          placeholder="Enter password"
          style={styles.passwordTextInput}
          value={password}
          onChangeText={setPassword}
          left={
            <TextInput.Icon
              name="form-textbox-password"
              color={password ? theme.colors.primary : theme.colors.text}
            />
          }
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              name={isPasswordVisible ? "eye-off" : "eye"}
              onPress={() => setIsPasswordVisible((state) => !state)}
            />
          }
          error={isHelperTextVisible ? passwordHasErrors(password) : false}
        />
        <View
          style={{
            height: "7%",
            width: "100%",
          }}
        >
          <HelperText
            style={styles.passwordHelperText}
            visible={hasText(password) ? !isHelperTextVisible : false}
          >
            Password requires at least 6 characters.
          </HelperText>
          <HelperText
            style={styles.passwordHelperText}
            type="error"
            visible={isHelperTextVisible ? passwordHasErrors(password) : false}
          >
            {getPasswordErrorMessage(password)}
          </HelperText>
        </View>
      </View>
      <View style={styles.buttonView}>
        <CustomButton
          title="Sign Up"
          bgColor={theme.colors.primary}
          loading={loading}
          //width={343}
          onPress={() => {
            hasErrors(name) ||
            hasErrors(username) ||
            emailHasErrors(email) ||
            passwordHasErrors(password)
              ? setIsHelperTextVisible(true)
              : signUp();
          }}
        ></CustomButton>
      </View>
      <View style={styles.signInSection}>
        <Text style={[styles.signInText1, { color: theme.colors.text }]}>
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            setName(""); //reset fields
            setUsername(""); //reset fields
            setEmail(""); //reset fields
            setPassword(""); //reset fields
            navigate(LOGIN);
          }}
        >
          <Text style={[styles.signInText2, { color: theme.colors.primary }]}>
            {" "}
            Sign in!
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

export default RegisterComponent;
