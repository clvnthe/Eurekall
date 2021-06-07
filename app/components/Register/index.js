import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { HelperText, TextInput } from "react-native-paper";

import { CONFIRM_REGISTRATION, LOGIN } from "../../constants/routeNames";
import Container from "../common/Container";
import CustomButton from "../common/CustomButton";
import styles from "./styles";
import colors from "../../../assets/theme/colors";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../../src/aws-exports";
import { useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
Amplify.configure(awsconfig);

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

  // For AWS amplify registration
  async function signUp() {
    try {
      setLoading(true);
      const { user } = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          preferred_username: username, // optional
          name: name, // optional - E.164 number convention
          // other custom attributes
        },
      });
      setIsSignInHelperTextVisible(false);
      setLoading(false);
      console.log("successful signup");
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
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={
            theme.dark
              ? require("../../../assets/images/eurekall_whitelogo.png")
              : require("../../../assets/images/eurekall_logo.png")
          }
        ></Image>
      </View>
      <Image
        style={{
          position: "absolute",
          width: 134,
          height: 199,
          left: "60%",
          top: 70,
        }}
        source={require("../../../assets/images/registerdoodle.png")}
      ></Image>
      <Text
        style={{
          position: "absolute",
          width: "50%",
          height: "125%",
          top: 100,
          left: "4%",
          fontSize: 44,
          fontFamily: "sans-serif-thin",
          color: theme.colors.text,
        }}
      >
        Register here
      </Text>
      <TextInput
        theme={{ roundness: 20 }}
        mode="flat"
        label="Your name"
        placeholder="Enter your name"
        style={{
          width: "93%",
          top: 210,
          alignSelf: "center",
          position: "absolute",
        }}
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
        style={{
          position: "absolute",
          top: 270,
        }}
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
        style={{
          width: 336,
          top: 290,
          alignSelf: "center",
          position: "absolute",
        }}
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
      <HelperText
        style={{
          position: "absolute",
          top: 350,
        }}
        type="error"
        visible={isHelperTextVisible ? emailHasErrors(email) : false}
      >
        {getEmailErrorMessage(email)}
      </HelperText>
      <HelperText
        style={{
          position: "absolute",
          top: 350,
        }}
        type="error"
        visible={!emailHasErrors(email) ? isSignInHelperTextVisible : false}
      >
        Email already exists! You can try logging in with this email.
      </HelperText>
      <TextInput
        ref={usernameTextInput}
        theme={{ roundness: 20 }}
        mode="flat"
        label="Username"
        placeholder="Enter username"
        style={{
          width: 336,
          top: 370,
          alignSelf: "center",
          position: "absolute",
        }}
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
        style={{
          position: "absolute",
          top: 430,
        }}
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
        style={{
          width: 336,
          top: 450,
          alignSelf: "center",
          position: "absolute",
        }}
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
      <HelperText
        style={{
          position: "absolute",
          top: 510,
        }}
        visible={hasText(password) ? !isHelperTextVisible : false}
      >
        Password requires at least 6 characters.
      </HelperText>
      <HelperText
        style={{
          position: "absolute",
          top: 510,
        }}
        type="error"
        visible={isHelperTextVisible ? passwordHasErrors(password) : false}
      >
        {getPasswordErrorMessage(password)}
      </HelperText>
      <View
        style={{
          top: 510,
          alignSelf: "center",
        }}
      >
        <CustomButton
          title="Sign Up"
          bgColor={theme.colors.primary}
          loading={loading}
          width={343}
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
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigate(LOGIN);
          }}
        >
          <Text style={[styles.signInText, { color: theme.colors.primary }]}>
            {" "}
            Sign in!
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

export default RegisterComponent;
