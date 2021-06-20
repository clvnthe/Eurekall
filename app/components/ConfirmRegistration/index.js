import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

import { LOGIN } from "../../constants/routeNames";
import CustomButton from "../common/CustomButton";
import styles from "./styles";
import Container from "../common/Container";
import { useTheme } from "@react-navigation/native";

function ConfirmRegistrationComponent() {
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const { navigate } = useNavigation();

  /*For AWS Amplify Confirm Sign up
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
   }*/

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
        source={
          theme.dark
            ? require("../../../assets/images/eurekall_whitelogo.png")
            : require("../../../assets/images/eurekall_logo.png")
        }
      ></Image>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Please check your email to verify your account!
      </Text>
      <View style={styles.loginButtonView}>
        <CustomButton
          title="Resend link"
          bgColor={theme.colors.primary}
          loading={loading}
          onPress={() => {
            console.log("link sent to email");
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

export default ConfirmRegistrationComponent;
