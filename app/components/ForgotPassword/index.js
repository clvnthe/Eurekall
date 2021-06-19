import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import { LOGIN, RESETPASSWORD } from "../../constants/routeNames";
import CustomButton from "../common/CustomButton";
import styles from "./styles";
import Container from "../common/Container";

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
const fireauth = firebase.auth();

function ForgotPasswordComponent() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const { navigate } = useNavigation();
  const theme = useTheme();

  // For AWS forget password
  async function forgotPassword() {
    try {
      await fireauth.sendPasswordResetEmail(email);
      alert("Rest password link has been sent to your email");
      setLoading(true);
      setIsSignInHelperTextVisible(false);
      setLoading(false);
      navigate(LOGIN);
    } catch (error) {
      setIsSignInHelperTextVisible(true);
      console.log("error confirming account:", error);
      setLoading(false);
    }
  }

  //FOR ERROR MESSAGES*********************/START
  const [isHelperTextVisible, setIsHelperTextVisible] = React.useState(false);
  const [isSignInHelperTextVisible, setIsSignInHelperTextVisible] =
    React.useState(false);

  const emailHasErrors = (text) => {
    return text.length === 0 || !text.includes("@");
  };

  const getEmailErrorMessage = (text) => {
    if (text.length === 0) {
      return "Email is required!";
    } else {
      return "Email is invalid!";
    }
  };
  //FOR ERROR MESSAGES*********************/END

  return (
    <Container backgroundColor={theme.colors.background}>
      <Image
        style={styles.logo}
        source={
          theme.dark
            ? require("../../../assets/images/eurekall_whitelogo.png")
            : require("../../../assets/images/eurekall_logo.png")
        }
      ></Image>
      <Image
        style={styles.doodle}
        source={require("../../../assets/images/forgotpassworddoodle.png")}
      ></Image>
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.text,
          },
        ]}
      >
        Forgot your password?
      </Text>
      <TextInput
        theme={{ roundness: 20 }}
        mode="flat"
        label="Email address"
        placeholder="e.g., abc@xyz.com"
        keyboardType="email-address"
        style={styles.emailTextInput}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        left={
          <TextInput.Icon
            name="at"
            color={email ? theme.colors.primary : theme.colors.text}
          />
        }
        error={isHelperTextVisible ? emailHasErrors(email) : false}
      />
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
        Please enter a correct email address.
      </HelperText>
      <View style={styles.buttonView}>
        <CustomButton
          title="Submit"
          bgColor={theme.colors.primary}
          loading={loading}
          //width={343}
          onPress={() => {
            emailHasErrors(email)
              ? setIsHelperTextVisible(true)
              : forgotPassword();
          }}
        ></CustomButton>
      </View>
      <View style={styles.signInSection}>
        <TouchableOpacity
          onPress={() => {
            navigate(LOGIN);
          }}
        >
          <Text style={[styles.signInText, { color: theme.colors.primary }]}>
            Return to login page
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

export default ForgotPasswordComponent;
