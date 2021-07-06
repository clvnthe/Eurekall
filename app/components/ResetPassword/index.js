import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

import { LOGIN, RESETPASSWORD } from "../../constants/routeNames";
import CustomButton from "../common/CustomButton";
import styles from "./styles";
import Container from "../common/Container";
import { useTheme } from "@react-navigation/native";

function ResetPasswordComponent() {
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const { navigate } = useNavigation();

  //For AWS reset Password
  /*function resetPassword() {
     setLoading(true);
     Auth.forgotPasswordSubmit(username.toString(), confirmationCode, password)
       .then((data) => console.log(data))
       .then(() => {
         console.log("reset fully successful");
         setLoading(false);
         setIsSignInHelperTextVisible(false);
       })
       .then(() => navigate(LOGIN))
       .catch((err) => {
         console.log(err);
         setLoading(false);
         setIsSignInHelperTextVisible(true);
       });
   }*/

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
        Please check your email to reset your password!
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

export default ResetPasswordComponent;
