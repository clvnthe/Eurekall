import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

import { LOGIN, RESETPASSWORD } from "../../constants/routeNames";
import CustomButton from "../common/CustomButton";
import styles from "./styles";
import Container from "../common/Container";
import { useTheme } from "@react-navigation/native";
import firebase from "firebase";
import {responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";

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

function ResetPasswordComponent() {
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  const { navigate } = useNavigation();
  const resendEmailVerification = async() =>{
      try {
          await firebase.auth().currentUser.sendEmailVerification();
      } catch(error) {
          console.log('firebase resend email error');
          console.log(error);
      }
  }

  return (
    <Container backgroundColor={theme.colors.background}>
        <View style={{justifyContent:'flex-end',
            height:responsiveHeight(15),
            width:responsiveWidth(95),
            marginLeft:responsiveWidth(16)
        }}>
            <Image
                style={styles.logo}
                resizeMode='contain'
                source={
                    theme.dark
                        ? require("../../../assets/images/eurekall_whitelogo_cropped.png")
                        : require("../../../assets/images/eurekall_logo_cropped.png")
                }
            ></Image>
        </View>
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
            resendEmailVerification();
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
