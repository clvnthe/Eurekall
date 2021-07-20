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
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

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
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
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
        setUserLvl(actualUserLvl);
      } catch (error) {
        console.log(error);
      }
    }, 0);
  }, []);

  const theme = useTheme();

  const { navigate } = useNavigation();

  const determineLvlCircleOutline = (userLvl) => {
    if (userLvl >= 30) {
      return ["#ff512f", "#dd2476"];
    } else if (userLvl >= 25) {
      return ["#FDC830", "#F37335"];
    } else if (userLvl >= 20) {
      return ["#00B4DB", "#0083B0"];
    } else if (userLvl >= 15) {
      return ["#3494E6", "#EC6EAD"];
    } else if (userLvl >= 10) {
      return ["#3E5151", "#DECBA4"];
    } else if (userLvl >= 5) {
      return ["#D3CCE3", "#E9E4F0"];
    } else {
      return ["#DBE6F6", "#DBE6F6"];
    }
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: "50%" }}>
      <View
        style={{
          height: windowHeight * 0.2,
          justifyContent: "center",
          backgroundColor: theme.colors.border,
          borderBottomStartRadius: 300,
          borderBottomEndRadius: 300,
        }}
      >
        <Avatar.Image
          size={120}
          style={styles.profilePic}
          source={{
            uri: image,
          }}
        ></Avatar.Image>
      </View>
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <Text style={[styles.name, { fontFamily: "PoppinsBold" }]}>
          {userInfo[1]}
        </Text>
        <Text style={[styles.username, { fontFamily: "PoppinsLight" }]}>
          @{userInfo[2]}
        </Text>
        <Text style={[styles.titleText, { fontFamily: "PoppinsLight" }]}>
          Mugger Dog
        </Text>
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
      </View>
      <View style={{ padding: 10 }}>
        <Text style={[styles.description, { fontFamily: "PoppinsLight" }]}>
          {userInfo[3]}
        </Text>
      </View>
      <View
        style={{
          alignSelf: "center",
          //top: 80,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <LinearGradient
            colors={determineLvlCircleOutline(userLvl)}
            style={{
              borderRadius: 75,
              width: 150,
              height: 150,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.background,
                width: 130,
                height: 130,
                borderRadius: 65,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "PoppinsBold" }}>{userLvl}</Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileComponent;
