import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Divider, Surface, Title } from "react-native-paper";
import { DECKS } from "../../constants/routeNames";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeComponent(props) {
  const theme = useTheme();
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

  const { navigate } = useNavigation();

  return (
    <View>
      <StatusBar
        backgroundColor={theme.colors.background}
        style={theme.dark ? "light" : "dark"}
      />
      <Title style={styles.title}>Hi {userInfo[1]}, Welcome Home</Title>
      <Divider />
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Text style={[styles.secondaryTitle, { color: theme.colors.text }]}>
          Study tip of the day
        </Text>
        <Surface style={styles.tipContainer}>
          <Text style={styles.tipContainerText}>
            The secret to getting ahead is getting started!
          </Text>
          <Image
            style={styles.tipContainerImage}
            source={require("../../../assets/images/study_tip.png")}
          ></Image>
        </Surface>
      </View>
      <Divider />
      <View style={{ paddingTop: 10 }}>
        <Text style={[styles.secondaryTitle, { color: theme.colors.text }]}>
          View your decks!
        </Text>
        <TouchableOpacity onPress={() => navigate(DECKS)}>
          <ImageBackground
            style={styles.imageContainer}
            blurRadius={3}
            borderRadius={20}
            source={require("../../../assets/images/deckbuttonbackground.png")}
          >
            <Text style={styles.imageText}>Decks</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeComponent;

const styles = StyleSheet.create({
  title: {
    fontFamily: "sans-serif-light",
    fontSize: 36,
    lineHeight: 40,
    paddingTop: 20,
    paddingLeft: 20,
    width: 300,
  },
  secondaryTitle: {
    fontFamily: "sans-serif-light",
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 10,
  },
  tipContainer: {
    height: 150,
    width: 330,
    alignSelf: "center",
    backgroundColor: "#FBF4E2",
    borderRadius: 20,
    elevation: 4,
  },
  tipContainerText: {
    paddingRight: 20,
    height: 141,
    width: 250,
    fontSize: 20,
    fontFamily: "sans-serif-light",
    textAlignVertical: "center",
    textAlign: "right",
  },
  tipContainerImage: {
    position: "absolute",
    height: 160,
    width: 84,
    transform: [{ scaleX: -1 }],
    alignSelf: "flex-end",
    bottom: -9,
    borderRadius: 20,
  },
  imageContainer: {
    height: 150,
    width: 330,
    alignSelf: "center",
    justifyContent: "center",
    elevation: 4,
  },
  imageText: {
    textAlign: "center",
    fontFamily: "sans-serif-light",
    fontSize: 36,
    color: "#ffffff",
  },
});
