import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import { LOGIN, RESETPASSWORD } from "../../constants/routeNames";
import CustomButton from "../common/CustomButton";
import styles from "./styles";
import colors from "../../../assets/theme/colors";
import Container from "../common/Container";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../../src/aws-exports";
Amplify.configure(awsconfig);

function ForgotPasswordComponent() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const { navigate } = useNavigation();
  const theme = useTheme();

  // For AWS forget password
  async function forgotPassword() {
    try {
      setLoading(true);
      setIsSignInHelperTextVisible(false);
      const { user } = await Auth.forgotPassword(email);
      console.log("forgot password successful");
      setLoading(false);
      navigate(RESETPASSWORD, { username: email });
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
        resizeMode="contain"
        source={
          theme.dark
            ? require("../../../assets/images/eurekall_whitelogo.png")
            : require("../../../assets/images/eurekall_logo.png")
        }
      ></Image>
      <Image
        style={{
          position: "absolute",
          width: 135,
          height: 169,
          left: "65%",
          top: 200,
        }}
        source={require("../../../assets/images/forgotpassworddoodle.png")}
      ></Image>
      <Text
        style={{
          position: "absolute",
          width: "100%",
          height: 136,
          top: 200,
          left: "3%",
          fontSize: 48,
          fontFamily: "sans-serif-thin",
          color: theme.colors.text,
        }}
      >
        Forgot your password?
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
      <HelperText
        style={{
          position: "absolute",
          top: 380,
        }}
        type="error"
        visible={!emailHasErrors(email) ? isSignInHelperTextVisible : false}
      >
        Please enter a correct email address.
      </HelperText>
      <View
        style={{
          position: "absolute",
          top: 362,
          paddingTop: 28,
          alignSelf: "center",
        }}
      >
        <CustomButton
          title="Submit"
          bgColor={theme.colors.primary}
          loading={loading}
          width={343}
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
