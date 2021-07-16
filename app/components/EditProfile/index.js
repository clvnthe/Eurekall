import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
  Dimensions,
} from "react-native";
import { Title, Text, Divider, TextInput } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import Container from "../common/Container";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import CustomButton from "../common/CustomButton";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useFonts } from "expo-font";

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

function EditProfileComponent(props) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const [image, setImage] = useState(
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe58bbba-fabe-4ca9-a574-04bb6f4d453d/d4j47k3-8983fc90-50e8-47ee-a08c-e7a31e7401ab.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZlNThiYmJhLWZhYmUtNGNhOS1hNTc0LTA0YmI2ZjRkNDUzZFwvZDRqNDdrMy04OTgzZmM5MC01MGU4LTQ3ZWUtYTA4Yy1lN2EzMWU3NDAxYWIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YbcvA7bF9G7E5gxhZuGcWw5bXoArcb_T-4z_BrmXyQ8"
  );
  const [userInfo, setUserInfo] = React.useState([]);

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

  const [name, setName] = useState(userInfo[1]);
  const [username, setUsername] = useState(userInfo[2]);
  const [description, setDescription] = useState(userInfo[3]);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const updateUserInfo = async () => {
    const userId = String(fireauth.currentUser.email);
    const updateUserInfoRef = firestore.collection("users").doc(userId);
    const name1 = typeof name === "undefined" ? userInfo[1] : name;
    const username1 = typeof username === "undefined" ? userInfo[2] : username;
    const description1 =
      typeof description === "undefined" ? userInfo[3] : description;

    try {
      if (name1 === "" || username1 === "") {
        Alert.alert("Edit Profile", "Fields cannot be empty.", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } else {
        await updateUserInfoRef.update({
          name: name1,
          preferred_username: username1,
          description: description,
        });
        await AsyncStorage.setItem(
          "userInfo",
          JSON.stringify([userInfo[0], name1, username1, description])
        );
        Alert.alert("Edit Profile", "Changes have been saved.", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userEmail = String(fireauth.currentUser.email);

  useEffect(() => {
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
  }, []);

  const uploadImage = async (imageuri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageuri, true);
      xhr.send(null);
    });
    const ref = fireBucket.ref().child("images/" + userEmail);
    return ref.put(blob);
  };

  const selectPicture = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } else {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const takePicture = async () => {
    let permissions = await Camera.requestPermissionsAsync();
    if (permissions.granted) {
      const { cancelled, uri } = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      });
      if (!cancelled) {
        setImage(uri);
      }
    } else {
      alert("Sorry, we need camera access permissions to make this work!");
    }
  };

  const bs = React.createRef(null);
  const fall = new Animated.Value(1);

  const renderInner = () => (
    <View
      style={[
        styles.panel,
        { backgroundColor: theme.dark ? "#363636" : "#ffffff" },
      ]}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload photo</Text>
        <Text style={styles.panelSubtitle}>Choose your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.panelButton,
          { backgroundColor: theme.colors.secondary },
        ]}
        onPress={takePicture}
      >
        <Text
          style={[
            styles.panelButtonTitle,
            { color: theme.dark ? "#333333" : "#ffffff" },
          ]}
        >
          Take Photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.panelButton,
          { backgroundColor: theme.colors.secondary },
        ]}
        onPress={selectPicture}
      >
        <Text
          style={[
            styles.panelButtonTitle,
            { color: theme.dark ? "#333333" : "#ffffff" },
          ]}
        >
          Choose From Gallery
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.panelButton,
          { backgroundColor: theme.colors.secondary },
        ]}
        onPress={() => {
          bs.current.snapTo(1);
        }}
      >
        <Text
          style={[
            styles.panelButtonTitle,
            { color: theme.dark ? "#333333" : "#ffffff" },
          ]}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: "transparent" /*theme.dark ? "#363636" : "#ffffff"*/,
        },
      ]}
    >
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

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
    <Container noPadding>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledContentGestureInteraction={false}
      />
      <TouchableWithoutFeedback
        onPress={() =>
          isOpen
            ? (bs.current.snapTo(1), setIsOpen(false))
            : console.log(isOpen)
        }
      >
        <Animated.View
          style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={{ alignItems: "center", padding: 20 }}>
            <TouchableOpacity
              onPress={() => {
                bs.current.snapTo(0);
                setIsOpen(true);
              }}
            >
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={{
                    uri: image,
                  }}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
          <Divider></Divider>
          <Title style={{ alignSelf: "center", fontFamily: "PoppinsBold" }}>
            Account Information
          </Title>
          <Text
            style={{
              color: "grey",
              paddingBottom: 10,
              fontFamily: "PoppinsMedium",
              textDecorationLine: "underline",
            }}
          >
            General
          </Text>
          <View
            style={{
              height: windowHeight * 0.48,
            }}
          >
            <View style={{}}>
              <Text style={{ fontFamily: "PoppinsRegular" }}>Name</Text>
              <TextInput
                theme={{ roundness: 20 }}
                mode="flat"
                defaultValue={userInfo[1]}
                value={name}
                onChangeText={(name) => setName(name.trim())}
                placeholder="Name"
                style={{
                  width: 336,
                  alignSelf: "center",
                }}
                autoCapitalize="none"
                left={
                  <TextInput.Icon
                    name="account"
                    color={true ? theme.colors.primary : theme.colors.text}
                  />
                }
              />
            </View>
            <View style={{}}>
              <Text style={{ fontFamily: "PoppinsRegular" }}>Username</Text>
              <TextInput
                theme={{ roundness: 20 }}
                mode="flat"
                defaultValue={userInfo[2]}
                value={username}
                onChangeText={(username) => setUsername(username.trim())}
                placeholder="Username"
                style={{
                  width: 336,
                  alignSelf: "center",
                }}
                autoCapitalize="none"
                left={
                  <TextInput.Icon
                    name="face-profile"
                    color={true ? theme.colors.primary : theme.colors.text}
                  />
                }
              />
            </View>
            <View style={{}}>
              <Text style={{ fontFamily: "PoppinsRegular" }}>Description</Text>
              <TextInput
                theme={{ roundness: 20 }}
                mode="flat"
                defaultValue={userInfo[3]}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                style={{
                  width: 336,
                  alignSelf: "center",
                  maxHeight: 100,
                }}
                multiline
                numberOfLines={5}
                autoCapitalize="none"
                left={
                  <TextInput.Icon
                    name="face-profile"
                    color={true ? theme.colors.primary : theme.colors.text}
                  />
                }
              />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <CustomButton
              title="Submit changes"
              width={336}
              onPress={() => {
                uploadImage(image)
                  .then(() => {
                    console.log("passed");
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                updateUserInfo();
              }}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});

export default EditProfileComponent;
