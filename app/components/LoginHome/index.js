import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, View, Text, ImageBackground } from "react-native";

import styles from "./styles";
import Container from "../common/Container";
import { LOGIN, REGISTER } from "../../constants/routeNames";
import CustomButton from "../common/CustomButton";
import { useTheme } from "react-native-paper";

function LoginHomeComponent(props) {
  const theme = useTheme();
  const { navigate } = useNavigation();

  return (
    <Container noPadding>
      <ImageBackground
        style={styles.backgroundImage}
        blurRadius={1}
        resizeMode="cover"
        source={require("../../../assets/images/loginbackground.png")}
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/images/eurekall_logo.png")}
        ></Image>
        <Text style={styles.title}>Start your journey here</Text>
        <View style={styles.signUpButton}>
          <CustomButton
            bgColor={theme.colors.primary}
            title="Sign Up"
            //width={343}
            onPress={() => navigate(REGISTER)}
          ></CustomButton>
        </View>
        <View style={styles.loginButton}>
          <CustomButton
            bgColor={theme.colors.primaryVariant}
            title="Log In"
            //width={343}
            onPress={() => navigate(LOGIN)}
          ></CustomButton>
        </View>
        <Image
          style={styles.doodle}
          source={require("../../../assets/images/loginhomedoodle.png")}
        ></Image>
      </ImageBackground>
    </Container>
  );
}

export default LoginHomeComponent;
