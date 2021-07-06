import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, View, Text, ImageBackground, Platform } from "react-native";

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
        blurRadius={Platform.OS === "android" ? 1 : 10}
        resizeMode="cover"
        source={require("../../../assets/images/loginbackground.png")}
      >
        <View style={styles.logoView}>
          <Image
            style={styles.logo}
            source={require("../../../assets/images/eurekall_logo_cropped.png")}
            resizeMode="contain"
          ></Image>
          <Text
            style={[
              styles.title,
              {
                fontFamily:
                  Platform.OS === "android"
                    ? "sans-serif-thin"
                    : "HelveticaNeue-Thin",
              },
            ]}
          >
            Start your journey here
          </Text>
        </View>
        <View style={styles.buttonView}>
          <CustomButton
            bgColor={theme.colors.primary}
            title="Sign Up"
            //width={343}
            onPress={() => navigate(REGISTER)}
          ></CustomButton>
          <CustomButton
            bgColor={theme.colors.primaryVariant}
            title="Log In"
            //width={343}
            onPress={() => navigate(LOGIN)}
          ></CustomButton>
        </View>
        <View style={styles.doodleView}>
          <Image
            style={styles.doodle}
            source={require("../../../assets/images/loginhomedoodle.png")}
            resizeMode="contain"
          ></Image>
        </View>
      </ImageBackground>
    </Container>
  );
}

export default LoginHomeComponent;
