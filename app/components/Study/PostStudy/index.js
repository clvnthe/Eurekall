import { useNavigation, useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Surface, Title } from "react-native-paper";
import { HOME_MAIN } from "../../../constants/routeNames";
import CustomButton from "../../common/CustomButton";
import LottieView from "lottie-react-native";

function PostStudyComponent(props) {
  const { reset } = useNavigation();
  const theme = useTheme();

  const [loaded] = useFonts({
    MontserratLight: require("../../../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../../../assets/fonts/Montserrat-Bold.ttf"),
    PoppinsMedium: require("../../../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../../../assets/fonts/Poppins-Light.ttf"),
    PoppinsThin: require("../../../../assets/fonts/Poppins-Thin.ttf"),
    PoppinsRegular: require("../../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.animationWrapper}>
        <LottieView
          source={require("../../../../assets/lottieAnimations/7893-confetti-cannons.json")}
          autoPlay
          loop={false}
        />
      </View>
      <View style={styles.mainWrapper}>
        <Surface
          style={[
            styles.statsWrapper,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
        >
          <Title
            style={{
              color: theme.dark ? theme.colors.onPrimary : "#ffffff",
              fontFamily: "PoppinsBold",
            }}
          >
            Studied: 5 cards
          </Title>
          <Text
            style={{
              color: theme.dark ? theme.colors.onPrimary : "#ffffff",
              fontFamily: "PoppinsRegular",
            }}
          >
            Card 1: 1 try
          </Text>
          <Text
            style={{
              color: theme.dark ? theme.colors.onPrimary : "#ffffff",
              fontFamily: "PoppinsRegular",
            }}
          >
            Card 2: 1 try
          </Text>
          <Text
            style={{
              color: theme.dark ? theme.colors.onPrimary : "#ffffff",
              fontFamily: "PoppinsRegular",
            }}
          >
            Card 3: 1 try
          </Text>
          <Text
            style={{
              color: theme.dark ? theme.colors.onPrimary : "#ffffff",
              fontFamily: "PoppinsRegular",
            }}
          >
            Card 4: 1 try
          </Text>
          <Text
            style={{
              color: theme.dark ? theme.colors.onPrimary : "#ffffff",
              fontFamily: "PoppinsRegular",
            }}
          >
            Card 5: 1 try
          </Text>
          <Text
            style={{
              color: theme.dark ? theme.colors.onPrimary : "#ffffff",
              fontFamily: "PoppinsMedium",
            }}
          >
            Exp earned: 100
          </Text>
        </Surface>
        <Surface style={styles.motivationWrapper}>
          <Title>Great Job!</Title>
        </Surface>
        <CustomButton
          title="Return to home"
          onPress={() =>
            reset({
              index: 0,
              routes: [{ name: HOME_MAIN }],
            })
          }
        />
      </View>
    </View>
  );
}

export default PostStudyComponent;

const styles = EStyleSheet.create({
  containerWrapper: {
    flex: 1,
    padding: "10rem",
    alignItems: "center",
  },
  animationWrapper: {
    height: "91%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  },
  mainWrapper: { alignItems: "center", zIndex: 0 },
  statsWrapper: {
    width: "350rem",
    height: "320rem",
    alignItems: "center",
    elevation: "8rem",
    justifyContent: "center",
    padding: "10rem",
    flex: 1,
  },
  motivationWrapper: {
    width: "350rem",
    height: "135rem",
    alignItems: "center",
    elevation: "8rem",
    justifyContent: "center",
    padding: "10rem",
  },
  answerText: {
    textAlign: "center",
    fontSize: "35rem",
    color: "#ffffff",
  },
  buttonsContainer: {
    width: "350rem",
    alignSelf: "center",
    paddingTop: "10rem",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "170rem",
    height: "80rem",
    borderRadius: "10rem",
    justifyContent: "center",
  },
});
