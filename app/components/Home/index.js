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
  const [userExp, setUserExp] = React.useState(0);
  const [userLvl, setUserLvl] = React.useState(1);
  const numOfDecks = useSelector(Decks.getDecks).length;
  const [objectivesRenderData, setObjectivesRenderData] =
    React.useState(objectivesData);
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
    }, 0);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const userEmail = String(fireauth.currentUser.email);
        const retrieveUser = await firestore
          .collection("users")
          .doc(userEmail)
          .get();
        console.log(userEmail);
        const userDetails = retrieveUser.data();
        const userExp = userDetails["exp"];
        const actualUserLvl = Math.floor(userExp / 500) + 1;
        const actualUserExp = userExp % 500;
        setUserExp(actualUserExp);
        setUserLvl(actualUserLvl);
      } catch (error) {
        console.log(error);
      }
    }, 0);
  }, []);

  const { navigate } = useNavigation();

  const objectiveUnlockedHandler = (id) => {
    setObjectivesRenderData(
      objectivesRenderData.filter((objective) => objective.id !== id)
    );
  };

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
        <TouchableOpacity
          style={[
            styles.objectivesTouchableOpacity,
            {
              backgroundColor: item.completed
                ? theme.colors.secondary
                : "#cccccc",
            },
          ]}
          disabled={!item.completed}
          onPress={() => objectiveUnlockedHandler(item.id)}
        >
          {!item.completed ? (
            <Text
              style={[
                {
                  fontFamily: "PoppinsMedium",
                  color: "#666666",
                },
                styles.objectivesFlatListName,
              ]}
            >
              0/{item.targetAmt}
            </Text>
          ) : (
            <MaterialCommunityIcons
              name="treasure-chest"
              size={24}
              color={theme.dark ? "black" : "white"}
            />
          )}
        </TouchableOpacity>
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
          <Text style={{ fontFamily: "PoppinsLight" }}>Level {userLvl}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: "PoppinsLight" }}>{userExp}/500</Text>
            <MaterialCommunityIcons
              name="diamond-stone"
              size={20}
              color={theme.colors.text}
            />
          </View>
        </View>
        <View style={styles.progressbarView}>
          <ProgressBar
            progress={userExp / 500}
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
          data={objectivesRenderData}
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
