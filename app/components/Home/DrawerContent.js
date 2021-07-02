import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  useTheme,
  Appbar,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EStyleSheet from "react-native-extended-stylesheet";

import { AuthContext } from "../../context/Provider";
import colors from "../../../assets/theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PROFILE_NAVIGATOR,
  SETTINGS_NAVIGATOR,
  TAB_NAVIGATOR,
} from "../../constants/routeNames";
import { useDispatch } from "react-redux";
import { useFonts } from "expo-font";
import * as Decks from "../../../store/slices/deckSlice";
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

const fireauth = firebase.auth();
const fireBucket = firebase.storage();
const firestore = firebase.firestore();

function DrawerContent(props) {
  const { logOut, toggleTheme } = React.useContext(AuthContext);
  const [userInfo, setUserInfo] = React.useState([]);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [image, setImage] = useState(
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe58bbba-fabe-4ca9-a574-04bb6f4d453d/d4j47k3-8983fc90-50e8-47ee-a08c-e7a31e7401ab.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZlNThiYmJhLWZhYmUtNGNhOS1hNTc0LTA0YmI2ZjRkNDUzZFwvZDRqNDdrMy04OTgzZmM5MC01MGU4LTQ3ZWUtYTA4Yy1lN2EzMWU3NDAxYWIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YbcvA7bF9G7E5gxhZuGcWw5bXoArcb_T-4z_BrmXyQ8"
  );

  const loadImage = (userEmail) => {
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
  };

  const loadDetails = async (userEmail) => {
    const userRef = firestore.collection("users");
    const userData = await userRef.where("email", "==", userEmail).get();
    const userDetails = userData["docs"][0].data();
    const nameOfUser = String(userDetails["name"]);
    const userName = String(userDetails["preferred_username"]);
    setName(nameOfUser);
    setUsername(userName);
  };

  if (userInfo.length !== 0) {
    loadImage(userInfo[0]);
    //console.log(userInfo);
    loadDetails(userInfo[0]);
  }

  const dispatch = useDispatch();

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
      setName(user[1]);
      setUsername(user[2]);
      loadImage(user[0]);
      console.log(userInfo);
    }, 0);
  }, [image]);

  async function signOut() {
    try {
      await fireauth.signOut();
      console.log("successful logging out");
      logOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const theme = useTheme();

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
    <View
      style={{
        flex: 1,
        elevation: 16,
        backgroundColor: theme.dark ? "#363636" : theme.colors.background,
      }}
    >
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.profilePicContainer}>
              <Avatar.Image
                source={{
                  uri: image,
                }}
                size={75}
              ></Avatar.Image>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <View style={{ flexDirection: "column" }}>
                <View style={styles.section}>
                  <Title
                    style={[
                      styles.title,
                      {
                        color: theme.dark
                          ? theme.colors.primary
                          : theme.colors.text,
                        fontFamily: "PoppinsBold",
                      },
                    ]}
                  >
                    {name}
                  </Title>
                </View>
                <View style={styles.section}>
                  <Caption
                    style={[styles.caption, { fontFamily: "PoppinsMedium" }]}
                  >
                    @{username}
                  </Caption>
                </View>
              </View>
            </Drawer.Section>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              labelStyle={{ fontFamily: "PoppinsRegular" }}
              onPress={() => {
                props.navigation.navigate(TAB_NAVIGATOR);
              }}
            ></DrawerItem>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              labelStyle={{ fontFamily: "PoppinsRegular" }}
              onPress={() => {
                props.navigation.navigate(PROFILE_NAVIGATOR);
              }}
            ></DrawerItem>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cog-outline" color={color} size={size} />
              )}
              label="Settings"
              labelStyle={{ fontFamily: "PoppinsRegular" }}
              onPress={() => {
                props.navigation.navigate(SETTINGS_NAVIGATOR);
              }}
            ></DrawerItem>
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => toggleTheme()}>
              <View style={styles.preference}>
                <Text
                  style={{ alignSelf: "center", fontFamily: "PoppinsRegular" }}
                >
                  {theme.dark ? "Dark Theme" : "Light Theme"}
                </Text>
                <View style={{ flexDirection: "row" }} pointerEvents="none">
                  <Avatar.Icon
                    backgroundColor={Appbar.color}
                    color={theme.dark ? colors.white : "#ff8c00"}
                    size={35}
                    icon={theme.dark ? "brightness-3" : "weather-sunny"}
                  />
                  <Switch
                    color={theme.colors.secondary}
                    value={theme.dark}
                    onValueChange={() => toggleTheme()}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          labelStyle={{ fontFamily: "PoppinsRegular" }}
          onPress={() => {
            dispatch(Decks.resetDeckState());
            signOut();
          }}
        ></DrawerItem>
      </Drawer.Section>
    </View>
  );
}

const styles = EStyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: "20rem",
  },
  profilePicContainer: { flexDirection: "row", marginTop: "15rem" },
  title: {
    fontSize: "25rem",
    marginTop: "3rem",
    //fontWeight: "bold",
  },
  caption: {
    fontSize: "15rem",
    lineHeight: "17rem",
  },
  row: {
    marginTop: "20rem",
    flexDirection: "row",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "15rem",
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: "3rem",
  },
  drawerSection: {
    marginTop: "15rem",
  },
  bottomDrawerSection: {
    marginBottom: "15rem",
    borderTopColor: "#f4f4f4",
    borderTopWidth: "1rem",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "2rem",
    paddingHorizontal: "16rem",
  },
});

export default DrawerContent;
