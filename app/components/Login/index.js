import { useNavigation } from "@react-navigation/core";
import React from "react";
import { HelperText, TextInput } from "react-native-paper";
import { Image, View, Text, TouchableOpacity } from "react-native";
import colors from "../../../assets/theme/colors";

import { REGISTER, FORGOTPASSWORD } from "../../constants/routeNames";
import CustomButton from "../common/CustomButton";
import styles from "./styles";
import Container from "../common/Container";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../../src/aws-exports";
import { AuthContext } from "../../context/Provider";
import { useTheme } from "@react-navigation/native";
Amplify.configure(awsconfig);

function LoginComponent(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const passwordTextInput = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const { logIn } = React.useContext(AuthContext);
  const theme = useTheme();

  //For aws Amplify connection
  async function signIn() {
    try {
      setLoading(true);
      setIsSignInHelperTextVisible(false);
      const user = await Auth.signIn(email, password);
      console.log("login successful");
      setLoading(false);
      logIn();
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
        style={{
          position: "absolute",
          width: 149,
          height: 169,
          left: "60%",
          top: 170,
        }}
        source={require("../../../assets/images/logindoodle.png")}
      ></Image>
      <Text
        style={{
          position: "absolute",
          width: "50%",
          height: 136,
          top: 200,
          left: "3%",
          fontSize: 48,
          fontFamily: "sans-serif-thin",
          color: theme.colors.text,
        }}
      >
        Login here
      </Text>
      <TextInput
        theme={{ roundness: 20 }}
        mode="flat"
        label="Email address"
        placeholder="e.g., abc@xyz.com"
        keyboardType="email-address"
        style={{
          width: 336,
          top: 320,
          alignSelf: "center",
          position: "absolute",
        }}
        value={email}
        onChangeText={setEmail}
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
        style={{
          position: "absolute",
          top: 380,
        }}
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
        style={{
          width: 336,
          top: 400,
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
          top: 460,
        }}
        type="error"
        visible={isHelperTextVisible ? passwordHasErrors(password) : false}
      >
        {getPasswordErrorMessage(password)}
      </HelperText>
      <HelperText
        style={{
          position: "absolute",
          top: 460,
        }}
        type="error"
        visible={
          !emailHasErrors(email) && !passwordHasErrors(password)
            ? isSignInHelperTextVisible
            : false
        }
      >
        Please enter a correct email and password. Note that both fields may be
        case-sensitive.
      </HelperText>
      <View
        style={{
          position: "absolute",
          top: 462,
          paddingTop: 28,
          alignSelf: "center",
        }}
      >
        <CustomButton
          title="Log In"
          bgColor={theme.colors.primary}
          loading={loading}
          width={343}
          onPress={() => {
            setIsHelperTextVisible(true);
            signIn();
          }}
        ></CustomButton>
      </View>
      <View
        style={{
          top: 620,
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 16 }}>
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
          <Text style={[styles.registerText, { color: theme.colors.primary }]}>
            Sign up here!
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          top: 510,
          width: 178,
          height: 19,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setEmail("");
            setPassword("");
            setIsHelperTextVisible(false);
            navigate(FORGOTPASSWORD);
          }}
        >
          <Text style={[styles.forgotPWText, { color: theme.colors.primary }]}>
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          top: 533,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: colors.grey }} />
        <View>
          <Text
            style={{
              top: -2,
              width: 30,
              textAlign: "center",
              fontFamily: "sans-serif-light",
              color: colors.grey,
            }}
          >
            or
          </Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: colors.grey }} />
      </View>
    </Container>
  );
}

export default LoginComponent;
