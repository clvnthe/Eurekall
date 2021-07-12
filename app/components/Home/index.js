import React, { useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  PixelRatio,
  FlatList,
} from "react-native";
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { Surface, Title, Text, ProgressBar, Badge } from "react-native-paper";
import { DECKS } from "../../constants/routeNames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Decks from "../../../store/slices/deckSlice";
import { useSelector } from "react-redux";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import firebase from "firebase";
import { ScrollView } from "moti";
import { objectivesData } from "../../../assets/data/objectivesData";

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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 375;

function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

function HomeComponent(props) {
  const theme = useTheme();
  const [userInfo, setUserInfo] = React.useState([]);
  const [userNumDeck, setUserNumDeck] = React.useState([]);
  const [numDeckComparator, setNumDeckComparator] = React.useState([]);
  const numOfDecks = useSelector(Decks.getDecks).length;

  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(async () => {
      let user;
      user = null;
      try {
        user = await AsyncStorage.getItem("userInfo").then((req) =>
          JSON.parse(req)
        );
      } catch (err) {
        console.log(err);
      }
      setUserInfo(user);
    }, 0);
  }, [isFocused]);

  useEffect(() => {
    setTimeout(async () => {
      let deckCount;
      deckCount = null;
      try {
        fireauth.onAuthStateChanged((user) => {
          if (user) {
            const userEmail = user.email;
            const retrieveDeckRef = firestore
              .collection("users")
              .doc(userEmail)
              .collection("decks");
            retrieveDeckRef.get().then((numDecks) => {
              deckCount = numDecks.size;
              //console.log(deckCount);
              setUserNumDeck(deckCount);
              setNumDeckComparator(numOfDecks);
            });
          } else {
            console.log("loading");
          }
        });
      } catch (err) {
        console.log(err);
      }
      console.log(userNumDeck);
    }, 0);
  }, []);

  const { navigate } = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <Surface
        style={[
          styles.objectivesFlatListView,
          {
            backgroundColor: theme.dark ? "#4d4b50" : "#F0FFF0",
            borderColor: theme.dark ? "#030200" : "#f1f9ec",
          },
        ]}
      >
        <View style={{ height: "50%", padding: 10 }}>
          <Text
            style={[
              { fontFamily: "PoppinsRegular" },
              styles.objectivesFlatListName,
            ]}
          >
            {item.objectiveName}
          </Text>
        </View>
        <Text
          style={[
            { fontFamily: "PoppinsMedium" },
            styles.objectivesFlatListName,
          ]}
        >
          0/{item.targetAmt}
        </Text>

        <Text
          style={[{ fontFamily: "PoppinsBold" }, styles.objectivesFlatListName]}
        >
          {item.expAmt} exp
        </Text>
      </Surface>
    );
  };

  const [loaded] = useFonts({
    MontserratLight: require("../../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../../assets/fonts/Montserrat-Bold.ttf"),
    PoppinsMedium: require("../../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../../assets/fonts/Poppins-Light.ttf"),
    PoppinsThin: require("../../../assets/fonts/Poppins-Thin.ttf"),
    PoppinsRegular: require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}>
      <View style={{ flex: 1 }}>
        <Title style={[styles.title, { fontSize: normalize(40) }]}>
          <Text style={{ fontFamily: "PoppinsThin" }}>hi </Text>
          <Text style={{ fontFamily: "PoppinsMedium" }}>{userInfo[1]}</Text>
          <Text style={{ fontFamily: "PoppinsThin" }}>,</Text>
        </Title>
        <View style={styles.welcomeHomeView}>
          <Title style={[styles.title, { fontSize: normalize(40) }]}>
            <Text style={{ fontFamily: "PoppinsThin" }}>welcome home!</Text>
          </Title>
        </View>
      </View>
      <View style={styles.progressContainer}>
        {/*<View style={styles.tierView}>
          <Badge size={50} style={{ backgroundColor: "#c68856" }}>
            <MaterialCommunityIcons name="gold" size={24} color="white" />
          </Badge>
          <View style={styles.tierTextView}>
            <Text style={styles.tierTextBold}>Your tier is Bronze!</Text>
            <Text style={styles.tierTextLight}>Earn more exp to progress!</Text>
          </View>
        </View>*/}
        <View style={styles.progressTextView}>
          <Text style={{ fontFamily: "PoppinsLight" }}>Level 1</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: "PoppinsLight" }}>300/500</Text>
            <MaterialCommunityIcons
              name="diamond-stone"
              size={20}
              color={theme.colors.text}
            />
          </View>
        </View>
        <View style={styles.progressbarView}>
          <ProgressBar
            progress={0.7}
            color={theme.colors.primary}
            style={styles.progressbar}
          />
        </View>
      </View>
      <View style={styles.objectivesView}>
        <Title style={[{ fontFamily: "PoppinsMedium" }, styles.objectivesText]}>
          My Objectives
        </Title>
        <FlatList
          data={objectivesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        ></FlatList>
      </View>
      <View style={styles.decksView}>
        <Title style={[{ fontFamily: "PoppinsMedium" }, styles.decksTitle]}>
          My Decks
        </Title>
        <TouchableOpacity
          onPress={() => navigate(DECKS)}
          style={styles.decksContainer}
        >
          <Surface
            style={[
              styles.decksSurface,
              {
                backgroundColor: theme.dark ? "#4d4b50" : "#F0FFF0",
                borderColor: theme.dark ? "#030200" : "#f1f9ec",
              },
            ]}
          >
            <AntDesign
              name="book"
              size={50}
              color={theme.colors.text}
              style={{ alignSelf: "center" }}
            />
            <Text
              style={[
                styles.decksText,
                { color: theme.colors.text, fontFamily: "PoppinsLight" },
              ]}
            >
              {numDeckComparator === numOfDecks ? userNumDeck : numOfDecks}{" "}
              {numOfDecks === 1 ? "deck" : "decks"}
            </Text>
          </Surface>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default HomeComponent;
