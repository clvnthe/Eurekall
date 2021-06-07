import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

import { LOGIN } from "../../constants/routeNames";
import CustomButton from "../common/CustomButton";
import styles from "./styles";
import colors from "../../../assets/theme/colors";
import Container from "../common/Container";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../../src/aws-exports";
import { useTheme } from "@react-navigation/native";
Amplify.configure(awsconfig);

function ConfirmRegistrationComponent() {
  const [email, setEmail] = React.useState("");
  const [confirmationCode, setConfirmationCode] = React.useState("");
  const confirmationCodeTextInput = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const { navigate } = useNavigation();

  // For AWS Amplify Confirm Sign up
  async function confirmSignUp() {
    try {
      setLoading(true);
      await Auth.confirmSignUp(email, confirmationCode);
      console.log("successful confirmation");
      setLoading(false);
      setIsSubmitHelperTextVisible(false);
      navigate(LOGIN);
    } catch (error) {
      console.log("error confirming sign up", error);
      setLoading(false);
      setIsSubmitHelperTextVisible(true);
    }
  }

  //FOR ERROR MESSAGES*********************/START
  const [isHelperTextVisible, setIsHelperTextVisible] = React.useState(false);
  const [isSubmitHelperTextVisible, setIsSubmitHelperTextVisible] =
    React.useState(false);

  const emailHasErrors = (text) => {
    return text.length === 0 || !text.includes("@");
  };

  const confirmationCodeHasErrors = (text) => {
    return text.length != 6;
  };

  const getEmailErrorMessage = (text) => {
    if (text.length === 0) {
      return "Email is required!";
    } else {
      return "Email is invalid!";
    }
  };

  const getConfirmationCodeErrorMessage = (text) => {
    if (text.length === 0) {
      return "Confirmation code is required!";
    } else {
      return "Confirmation code is invalid!";
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
      <Text
        style={{
          position: "absolute",
          width: "100%",
          height: 136,
          top: 175,
          left: "3%",
          fontSize: 48,
          fontFamily: "sans-serif-thin",
          color: theme.colors.text,
        }}
      >
        Confirm your registration
      </Text>
      <TextInput
        theme={{ roundness: 20 }}
        mode="flat"
        label="Email address"
        placeholder="e.g., abc@xyz.com"
        keyboardType="email-address"
        style={{
          width: 336,
          top: 300,
          alignSelf: "center",
          position: "absolute",
        }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => confirmationCodeTextInput.current.focus()}
        left={
          <TextInput.Icon
            name="at"
            color={email ? theme.colors.primary : theme.colors.text}
          />
        }
        error={
          isHelperTextVisible || isSubmitHelperTextVisible
            ? isSubmitHelperTextVisible || emailHasErrors(email)
            : false
        }
      />
      <HelperText
        style={{
          position: "absolute",
          top: 360,
        }}
        type="error"
        visible={isHelperTextVisible ? emailHasErrors(email) : false}
      >
        {getEmailErrorMessage(email)}
      </HelperText>
      <TextInput
        ref={confirmationCodeTextInput}
        theme={{ roundness: 20 }}
        mode="flat"
        label="Confirmation code"
        placeholder="e.g., 123456"
        keyboardType="number-pad"
        style={{
          width: 336,
          top: 380,
          alignSelf: "center",
          position: "absolute",
        }}
        value={confirmationCode}
        onChangeText={setConfirmationCode}
        left={
          <TextInput.Icon
            name="numeric"
            color={confirmationCode ? theme.colors.primary : theme.colors.text}
          />
        }
        error={
          isHelperTextVisible || isSubmitHelperTextVisible
            ? isSubmitHelperTextVisible ||
              confirmationCodeHasErrors(confirmationCode)
            : false
        }
      />
      <HelperText
        style={{
          position: "absolute",
          top: 440,
        }}
        type="error"
        visible={
          isHelperTextVisible
            ? confirmationCodeHasErrors(confirmationCode)
            : false
        }
      >
        {getConfirmationCodeErrorMessage(confirmationCode)}
      </HelperText>
      <HelperText
        style={{
          position: "absolute",
          top: 440,
        }}
        type="error"
        visible={
          isSubmitHelperTextVisible &&
          !confirmationCodeHasErrors(confirmationCode)
            ? true
            : false
        }
      >
        Please enter the correct email and confirmation code.
      </HelperText>
      <View
        style={{
          position: "absolute",
          top: 450,
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
            setIsHelperTextVisible(true);
            confirmSignUp();
          }}
        ></CustomButton>
      </View>
      <View style={styles.resendCodeTextSection}>
        <TouchableOpacity
          onPress={() => {
            console.log("code sent");
          }}
        >
          <Text
            style={[styles.resendCodeText, { color: theme.colors.primary }]}
          >
            Resend code
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginTextSection}>
        <TouchableOpacity
          onPress={() => {
            navigate(LOGIN);
          }}
        >
          <Text style={[styles.loginText, { color: theme.colors.primary }]}>
            Return to login page
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

export default ConfirmRegistrationComponent;
