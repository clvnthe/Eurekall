import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useIsFocused,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
  Title,
  Text,
  Avatar,
  Surface,
  Subheading,
  Badge,
} from "react-native-paper";
import { EDIT_PROFILE } from "../../constants/routeNames";
import Container from "../common/Container";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "moti";

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
const fireBucket = firebase.storage();

function ProfileComponent(props) {
  const [userInfo, setUserInfo] = React.useState([]);
  const [image, setImage] = useState(
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe58bbba-fabe-4ca9-a574-04bb6f4d453d/d4j47k3-8983fc90-50e8-47ee-a08c-e7a31e7401ab.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZlNThiYmJhLWZhYmUtNGNhOS1hNTc0LTA0YmI2ZjRkNDUzZFwvZDRqNDdrMy04OTgzZmM5MC01MGU4LTQ3ZWUtYTA4Yy1lN2EzMWU3NDAxYWIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YbcvA7bF9G7E5gxhZuGcWw5bXoArcb_T-4z_BrmXyQ8"
  );
  const userEmail = String(fireauth.currentUser.email);
  const [userLvl, setUserLvl] = React.useState(1);

  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(async () => {
      fireBucket
        .ref()
        .child("images/" + userEmail)
        .getDownloadURL()
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 0);
  }, [isFocused]);

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
        setTimeout( async () => {
            try {
                const userEmail = String(fireauth.currentUser.email);
                const retrieveUser = await firestore.collection('users').doc(userEmail).get()
                console.log(userEmail);
                const userDetails = retrieveUser.data();
                const userExp = userDetails["exp"];
                const actualUserLvl = Math.floor(userExp/500) + 1;
                setUserLvl(actualUserLvl);
            } catch (error){
                console.log(error);
            }
        }, 0)
    }, [])



  const theme = useTheme();

  const { navigate } = useNavigation();

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
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: "50%" }}>
      <Avatar.Image
        size={120}
        style={styles.profilePic}
        source={{
          uri: image,
        }}
      ></Avatar.Image>
      <Title style={[styles.name, { fontFamily: "PoppinsBold" }]}>
        {userInfo[1]}
      </Title>
      <Subheading style={[styles.username, { fontFamily: "PoppinsLight" }]}>
        @{userInfo[2]}
      </Subheading>
      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => navigate(EDIT_PROFILE)}
      >
        <Surface
          style={[
            styles.editProfileButtonContainer,
            {
              backgroundColor: theme.colors.primary,
            },
          ]}
        >
          <Feather name="edit" size={18} color="#ffffff" />
          <Text
            style={[
              styles.editProfileButtonText,
              { fontFamily: "PoppinsMedium" },
            ]}
          >
            Edit Profile
          </Text>
        </Surface>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <Title style={[styles.levelText, { fontFamily: "PoppinsMedium" }]}>
          Level{" "}
        </Title>
        <View style={{ justifyContent: "center" }}>
          <LinearGradient
            colors={["#ff512f", "#dd2476"]}
            style={{
              borderRadius: 15,
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.background,
                width: 20,
                height: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "PoppinsBold" }}>{userLvl}</Text>
            </View>
          </LinearGradient>
        </View>
      </View>
      <Title style={[styles.titleText, { fontFamily: "PoppinsMedium" }]}>
        Title: Mugger Dog
      </Title>
      <Subheading style={[styles.description, { fontFamily: "PoppinsLight" }]}>
        {userInfo[3]}
      </Subheading>
      <View style={styles.dividerContainer}>
        <View style={styles.rankContainer}>
          <Badge
            size={50}
            style={{ backgroundColor: "#c68856", alignSelf: "center" }}
          >
            <MaterialCommunityIcons name="gold" size={24} color="white" />
          </Badge>
          <Text style={[styles.rankText, { fontFamily: "PoppinsRegular" }]}>
            Bronze
          </Text>
        </View>
        <View style={styles.pointsContainer}>
          <MaterialCommunityIcons
            name="diamond-stone"
            size={50}
            color="#4169e1"
          />
          <Text style={[styles.pointsText, { fontFamily: "PoppinsRegular" }]}>
            300
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileComponent;
