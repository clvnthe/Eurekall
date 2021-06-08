import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Surface, Title, Text } from "react-native-paper";
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
              styles.thirdContainerText,
              { fontSize: 30, fontFamily: "sans-serif" },
            ]}
          >
            My Decks
          </Text>
          <Text
            style={[
              styles.thirdContainerText,
              {
                fontSize: 16,
                color: theme.colors.primary,
                top: 26,
                fontFamily: "sans-serif-thin",
              },
            ]}
          >
            2 decks
          </Text>
          <Image
            style={styles.thirdContainerImage}
            resizeMode="contain"
            source={require("../../../assets/images/deckIcon.png")}
          ></Image>
        </Surface>
      </TouchableOpacity>
      <Image
        style={{ position: "absolute", height: 422, width: 422, left: -340 }}
        source={require("../../../assets/images/bubble1.png")}
      ></Image>
      <Image
        style={{
          position: "absolute",
          height: 44,
          width: 44,
          left: 40,
          top: 350,
        }}
        resizeMode="contain"
        source={require("../../../assets/images/bubble2.png")}
      ></Image>
      <Image
        style={{
          position: "absolute",
          height: 44,
          width: 44,
          left: 10,
          top: 400,
        }}
        resizeMode="contain"
        source={require("../../../assets/images/bubble3.png")}
      ></Image>
      <Image
        style={{
          position: "absolute",
          height: 67,
          width: 67,
          left: 25,
          top: 450,
        }}
        resizeMode="contain"
        source={require("../../../assets/images/bubble4.png")}
      ></Image>
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
    left: 100,
    width: 259,
  },
  firstContainer: {
    height: 100,
    width: 311,
    left: 100,
    elevation: 4,
    backgroundColor: "#F5587B",
  },
  firstContainerText: {
    left: 10,
    top: 33,
    color: "#ffffff",
    fontSize: 16,
  },
  secondContainer: {
    height: 180,
    width: 260,
    left: 100,
    elevation: 4,
    backgroundColor: "#FF8A5C",
  },
  secondContainerText: {
    width: 140,
    left: 10,
    top: 33,
    color: "#ffffff",
    fontSize: 18,
  },
  secondContainerImage: {
    height: 175,
    width: 150,
    transform: [{ scaleX: -1 }],
    alignSelf: "flex-end",
    bottom: 76,
    left: 30,
  },
  thirdContainer: {
    height: 140,
    width: 260,
    left: 100,
    elevation: 4,
    backgroundColor: "#FFF591",
  },
  thirdContainerText: {
    left: 10,
    top: 33,
    fontWeight: "bold",
  },
  thirdContainerImage: {
    height: 110,
    width: 110,
    alignSelf: "flex-end",
    bottom: 40,
  },
});
