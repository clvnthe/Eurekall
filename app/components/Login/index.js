import { useNavigation } from "@react-navigation/core";
import React from "react";
import { HelperText, TextInput } from "react-native-paper";
import { Image, View, Text, TouchableOpacity, Platform } from "react-native";
import colors from "../../../assets/theme/colors";

import { REGISTER, FORGOTPASSWORD } from "../../constants/routeNames";
import CustomButton from "../common/CustomButton";
import styles from "./styles";
import Container from "../common/Container";

import { AuthContext } from "../../context/Provider";
import { useTheme } from "@react-navigation/native";
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

function LoginComponent(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const passwordTextInput = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const { logIn } = React.useContext(AuthContext);
  const theme = useTheme();

  //For firebase connection
  async function signIn() {
    try {
      setLoading(true);
      setIsSignInHelperTextVisible(false);
      const user = await fireauth.signInWithEmailAndPassword(email, password);
      if(user["user"]["emailVerified"]){
        console.log("login successful");
        logIn();
      } else {
        alert("Kindly verify your email first by accessing the link sent to your email")
      }
      setLoading(false);
    } catch (error) {
      setIsSignInHelperTextVisible(true);
      console.log("error signing in", error);
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

  const passwordHasErrors = (text) => {
    if (text.length === 0) {
      return true;
    } else if (text.length < 6) {
      return true;
    } else {
      return false;
    }
  };

  const getEmailErrorMessage = (text) => {
    if (text.length === 0) {
      return "Email is required!";
    } else {
      return "Email is invalid!";
    }
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
          Login here
        </Text>
        <Image
          style={styles.doodle}
          source={require("../../../assets/images/logindoodle.png")}
        ></Image>
      </View>
      <View style={styles.inputView}>
        <TextInput
          theme={{ roundness: 20 }}
          mode="flat"
          label="Email address"
          placeholder="e.g., abc@xyz.com"
          keyboardType="email-address"
          style={styles.emailAddressTextInput}
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          returnKeyType="next"
          onSubmitEditing={() => passwordTextInput.current.focus()}
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
          style={styles.emailAddressHelperText}
          type="error"
          visible={isHelperTextVisible ? emailHasErrors(email) : false}
        >
          {getEmailErrorMessage(email)}
        </HelperText>
        <TextInput
          ref={passwordTextInput}
          theme={{ roundness: 20 }}
          mode="flat"
          label="Password"
          placeholder="Enter password"
          style={styles.passwordTextInput}
          value={password}
          onChangeText={(password) => setPassword(password.trim())}
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
              forceTextInputFocus={false}
            />
          }
          error={isHelperTextVisible ? passwordHasErrors(password) : false}
        />
        <View style={styles.passwordHelperTextView}>
          <HelperText
            style={styles.passwordHelperText}
            type="error"
            visible={isHelperTextVisible ? passwordHasErrors(password) : false}
          >
            {getPasswordErrorMessage(password)}
          </HelperText>
          <HelperText
            style={styles.passwordHelperText}
            type="error"
            visible={
              !emailHasErrors(email) && !passwordHasErrors(password)
                ? isSignInHelperTextVisible
                : false
            }
          >
            Please enter a correct email and password. Note that both fields may
            be case-sensitive.
          </HelperText>
        </View>
      </View>
      <View style={styles.loginButtonView}>
        <CustomButton
          title="Log In"
          bgColor={theme.colors.primary}
          loading={loading}
          //width={343}
          onPress={() => {
            setIsHelperTextVisible(true);
            signIn();
          }}
        ></CustomButton>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.forgotPasswordView}>
          <TouchableOpacity
            onPress={() => {
              setEmail("");
              setPassword("");
              setIsHelperTextVisible(false);
              navigate(FORGOTPASSWORD);
            }}
          >
            <Text
              style={[styles.forgotPWText, { color: theme.colors.primary }]}
            >
              Forgot your password?{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dividerView}>
          <View
            style={[styles.dividerLine, { backgroundColor: colors.grey }]}
          />
          <View>
            <Text
              style={[
                styles.dividerText,
                {
                  color: colors.grey,
                  fontFamily:
                    Platform.OS === "android"
                      ? "sans-serif-thin"
                      : "HelveticaNeue-Thin",
                },
              ]}
            >
              or
            </Text>
          </View>
          <View
            style={[styles.dividerLine, { backgroundColor: colors.grey }]}
          />
        </View>
        <View style={styles.signUpView}>
          <Text style={[styles.signUpText, { color: theme.colors.text }]}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setEmail("");
              setPassword("");
              setIsHelperTextVisible(false);
              navigate(REGISTER);
            }}
          >
            <Text
              style={[styles.registerText, { color: theme.colors.primary }]}
            >
              Sign up here!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

export default LoginComponent;
