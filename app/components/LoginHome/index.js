import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import colors from "../../../assets/theme/colors";

import styles from "./styles";
import Container from "../common/Container";
import { LOGIN, REGISTER } from "../../constants/routeNames";
import CustomButton from "../common/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";

function LoginHomeComponent(props) {
  const theme = useTheme();
  const { navigate } = useNavigation();

  return (
    <Container noPadding>
      <ImageBackground
        style={{ width: "100%", height: "110%" }}
        blurRadius={1}
        resizeMode="cover"
        source={require("../../../assets/images/loginbackground.png")}
      >
        <Image
          style={{
            width: 160,
            height: 180,
            position: "absolute",
            top: "70%",
          }}
          source={require("../../../assets/images/loginhomedoodle.png")}
        ></Image>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/eurekall_logo.png")}
        ></Image>
        <Text
          style={{
            width: "80%",
            top: 234,
            left: 20,
            fontSize: 48,
            lineHeight: 59,
            position: "absolute",
            fontFamily: "sans-serif-thin",
          }}
        >
          Start your journey here
        </Text>
        <View style={{ position: "absolute", top: "45%", alignSelf: "center" }}>
          <CustomButton
            bgColor={theme.colors.primary}
            title="Sign Up"
            width={343}
            onPress={() => navigate(REGISTER)}
          ></CustomButton>
        </View>
        <View style={{ position: "absolute", top: "52%", alignSelf: "center" }}>
          <CustomButton
            bgColor={theme.colors.primaryVariant}
            title="Log In"
            width={343}
            onPress={() => navigate(LOGIN)}
          ></CustomButton>
        </View>
      </ImageBackground>
    </Container>
  );
}

export default LoginHomeComponent;
