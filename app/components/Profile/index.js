import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useTheme } from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Title, Text, Avatar, Surface, Subheading } from "react-native-paper";
import { EDIT_PROFILE } from "../../constants/routeNames";
import Container from "../common/Container";
import styles from "./styles";
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
const fireBucket = firebase.storage();



function ProfileComponent(props) {
  const [userInfo, setUserInfo] = React.useState([]);
  const [image, setImage] = useState(
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe58bbba-fabe-4ca9-a574-04bb6f4d453d/d4j47k3-8983fc90-50e8-47ee-a08c-e7a31e7401ab.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZlNThiYmJhLWZhYmUtNGNhOS1hNTc0LTA0YmI2ZjRkNDUzZFwvZDRqNDdrMy04OTgzZmM5MC01MGU4LTQ3ZWUtYTA4Yy1lN2EzMWU3NDAxYWIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YbcvA7bF9G7E5gxhZuGcWw5bXoArcb_T-4z_BrmXyQ8"
  );
  const userEmail = String(fireauth.currentUser.email);
  const loadImage = fireBucket.ref().child('images/' + userEmail).getDownloadURL()
        .then((url) => {
            setImage(url);
        }).catch((error) => {
            console.log(error);
        });

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
  }, []);

  const theme = useTheme();

  const { navigate } = useNavigation();

  return (
    <Container noPadding>
      <Image
        style={styles.coverPic}
        source={require("../../../assets/images/profilebackground2.png")}
        resizeMode="cover"
      ></Image>
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
          <Avatar.Icon
            icon="pen"
            size={30}
            style={{ position: "absolute", backgroundColor: "transparent" }}
          ></Avatar.Icon>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </Surface>
      </TouchableOpacity>
      <Avatar.Image
        size={120}
        style={styles.profilePic}
        source={{
          uri: image,
        }}
      ></Avatar.Image>
      <Title style={styles.name}>{userInfo[1]}</Title>
      <Subheading style={styles.username}>@{userInfo[2]}</Subheading>
      <Text style={styles.title}>Joined 6 months ago</Text>
      <View style={styles.dividerContainer}>
        <View style={styles.rankContainer}>
          <Image
            style={styles.rank}
            source={
              theme.dark
                ? require("../../../assets/images/rankwhite.png")
                : require("../../../assets/images/rank.png")
            }
          ></Image>
          <Text style={styles.rankText}>Beginner</Text>
        </View>
        <View style={styles.pointsContainer}>
          <Image
            style={styles.points}
            source={
              theme.dark
                ? require("../../../assets/images/pointswhite.png")
                : require("../../../assets/images/points.png")
            }
          ></Image>
          <Text style={styles.pointsText}>800,000</Text>
        </View>
      </View>
      <Image
        style={styles.bottomCoverPic}
        source={require("../../../assets/images/profilebackground.png")}
        resizeMode="cover"
      ></Image>
    </Container>
  );
}

export default ProfileComponent;
