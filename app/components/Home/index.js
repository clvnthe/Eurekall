import React, { useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Surface, Title, Text } from "react-native-paper";
import { DECKS } from "../../constants/routeNames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Decks from "../../../store/slices/deckSlice";
import { useSelector } from "react-redux";
import styles from "./styles";

function HomeComponent(props) {
  const theme = useTheme();
  const [userInfo, setUserInfo] = React.useState([]);
  const numOfDecks = useSelector(Decks.getDecks).length;

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
      <Title style={styles.title}>
        <Text style={{ fontFamily: "sans-serif-thin" }}>hi </Text>
        <Text style={{ fontWeight: "bold" }}>{userInfo[1]}</Text>
        <Text style={{ fontFamily: "sans-serif-thin" }}>, welcome home!</Text>
      </Title>
      <Surface style={styles.firstContainer}>
        <Text
          style={[
            styles.firstContainerText,
            {
              fontFamily: "sans-serif",
            },
          ]}
        >
          POINTS
        </Text>
        <Text
          style={[
            styles.firstContainerText,
            {
              fontFamily: "sans-serif-light",
            },
          ]}
        >
          800,000
        </Text>
      </Surface>
      <Surface style={styles.secondContainer}>
        <Text
          style={[
            styles.secondContainerText,
            {
              fontFamily: "sans-serif",
              fontWeight: "bold",
            },
          ]}
        >
          #dailyadvice
        </Text>
        <Text
          style={[
            styles.secondContainerText,
            {
              fontFamily: "sans-serif",
            },
          ]}
        >
          the secret to getting ahead is getting started
        </Text>
        <Image
          style={styles.secondContainerImage}
          source={require("../../../assets/images/study_tip.png")}
        ></Image>
      </Surface>
      <TouchableOpacity onPress={() => navigate(DECKS)}>
        <Surface style={styles.thirdContainer}>
          <Text
            style={[
              styles.thirdContainerText1,
              { fontFamily: "sans-serif", color: "#333333" },
            ]}
          >
            My Decks
          </Text>
          <Text
            style={[
              styles.thirdContainerText2,
              {
                fontSize: 16,
                color: "#767676",
                top: 26,
                fontFamily: "sans-serif-light",
              },
            ]}
          >
            {numOfDecks} decks
          </Text>
          <Image
            style={styles.thirdContainerImage}
            resizeMode="contain"
            source={require("../../../assets/images/deckIcon.png")}
          ></Image>
        </Surface>
      </TouchableOpacity>
      <Image
        style={styles.bubble1}
        source={require("../../../assets/images/bubble1.png")}
      ></Image>
      <Image
        style={styles.bubble2}
        resizeMode="contain"
        source={require("../../../assets/images/bubble2.png")}
      ></Image>
      <Image
        style={styles.bubble3}
        resizeMode="contain"
        source={require("../../../assets/images/bubble3.png")}
      ></Image>
      <Image
        style={styles.bubble4}
        resizeMode="contain"
        source={require("../../../assets/images/bubble4.png")}
      ></Image>
    </View>
  );
}

export default HomeComponent;
