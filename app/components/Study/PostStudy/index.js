import { useNavigation, useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Surface, Title } from "react-native-paper";
import { DECKS, HOME_MAIN } from "../../../constants/routeNames";
import CustomButton from "../../common/CustomButton";
import LottieView from "lottie-react-native";
import firebase from "firebase";
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
const firestore = firebase.firestore();
const fireauth = firebase.auth();

function PostStudyComponent({ route }) {
  const { reset } = useNavigation();
  const theme = useTheme();

  const updateExptoFirebase = async () => {
    try {
      const userEmail = await String(fireauth.currentUser.email);
      const updateExp = firestore.collection("users").doc(userEmail);
      const userExpRef = await updateExp.get();
      const userExpDetails = userExpRef.data();
      const overallUserExp = userExpDetails["exp"];
      const updatedExp = overallUserExp + 10;
      await updateExp.set(
        {
          exp: updatedExp,
        },
        { merge: true }
      );
    } catch (error) {
      console.log("score update error");
      console.log(error);
    }
  };

  !route.params.studyAll && updateExptoFirebase();

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

  const renderStats = (stat) => (
    <Text
      style={{
        color: theme.dark ? theme.colors.onPrimary : "#ffffff",
        fontFamily: "PoppinsRegular",
      }}
    >
      Card {stat.item.cardNumber}: {stat.item.numOfTries}{" "}
      {stat.item.numOfTries === "1" ? "try" : "tries"}
    </Text>
  );

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
            Studied: {route.params.statsTracker.length}{" "}
            {route.params.statsTracker.length === 1 ? "card" : "cards"}
          </Title>
          <FlatList
            data={route.params.statsTracker.reverse()}
            renderItem={renderStats}
            keyExtractor={(item) => item.id}
          />
          {!route.params.studyAll && (
            <Text
              style={{
                color: theme.dark ? theme.colors.onPrimary : "#ffffff",
                fontFamily: "PoppinsMedium",
              }}
            >
              Exp earned: 10
            </Text>
          )}
        </Surface>
        <Surface style={styles.motivationWrapper}>
          <Title>Great Job!</Title>
        </Surface>
        <CustomButton
          title="Return back"
          onPress={() =>
            reset({
              index: 1,
              routes: [{ name: HOME_MAIN }, { name: DECKS }],
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
