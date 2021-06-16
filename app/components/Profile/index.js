import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ImageBackground, Image, TouchableOpacity, View } from "react-native";
import {
  Title,
  Text,
  Avatar,
  Divider,
  Surface,
  Subheading,
} from "react-native-paper";
import { EDIT_PROFILE } from "../../constants/routeNames";
import Container from "../common/Container";

function ProfileComponent(props) {
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

  const theme = useTheme();

  const { navigate } = useNavigation();

  return (
    <Container noPadding>
      <Image
        style={{
          position: "absolute",
          width: "100%",
          height: "20%",
          justifyContent: "center",
        }}
        source={require("../../../assets/images/profilebackground2.png")}
        resizeMode="cover"
      ></Image>
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          right: 10,
          top: 130,
        }}
        onPress={() => navigate(EDIT_PROFILE)}
      >
        <Surface
          style={{
            backgroundColor: theme.colors.primary,
            height: 40,
            width: 100,
            justifyContent: "center",
            elevation: 4,
            borderRadius: 10,
          }}
        >
          <Avatar.Icon
            icon="pen"
            size={30}
            style={{ position: "absolute", backgroundColor: "transparent" }}
          ></Avatar.Icon>
          <Text
            style={{
              left: 25,
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Edit Profile
          </Text>
        </Surface>
      </TouchableOpacity>
      <Avatar.Image
        size={120}
        style={{ top: 20, elevation: 8, alignSelf: "center" }}
        source={{
          uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe58bbba-fabe-4ca9-a574-04bb6f4d453d/d4j47k3-8983fc90-50e8-47ee-a08c-e7a31e7401ab.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZlNThiYmJhLWZhYmUtNGNhOS1hNTc0LTA0YmI2ZjRkNDUzZFwvZDRqNDdrMy04OTgzZmM5MC01MGU4LTQ3ZWUtYTA4Yy1lN2EzMWU3NDAxYWIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YbcvA7bF9G7E5gxhZuGcWw5bXoArcb_T-4z_BrmXyQ8",
        }}
      ></Avatar.Image>
      <Title
        style={{
          fontSize: 24,
          fontWeight: "bold",
          fontFamily: "sans-serif",
          alignSelf: "center",
          top: 20,
        }}
      >
        {userInfo[1]}
      </Title>
      <Subheading
        style={{
          textAlign: "center",
          fontFamily: "sans-serif-light",
          top: 10,
        }}
      >
        @{userInfo[2]}
      </Subheading>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 24,
          fontFamily: "sans-serif-thin",
          top: 32,
        }}
      >
        Joined 6 months ago
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          top: 80,
          borderBottomColor: "#dddddd",
          borderBottomWidth: 1,
          borderTopColor: "#dddddd",
          borderTopWidth: 1,
          padding: 10,
        }}
      >
        <View
          style={{
            width: "50%",
            alignItems: "center",
            borderRightColor: "#dddddd",
            borderRightWidth: 1,
          }}
        >
          <Image
            style={{ height: 81, width: 60 }}
            source={
              theme.dark
                ? require("../../../assets/images/rankwhite.png")
                : require("../../../assets/images/rank.png")
            }
          ></Image>
          <Text style={{ fontFamily: "sans-serif-light", fontSize: 24 }}>
            Beginner
          </Text>
        </View>
        <View
          style={{
            width: "50%",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 81, width: 60 }}
            source={
              theme.dark
                ? require("../../../assets/images/pointswhite.png")
                : require("../../../assets/images/points.png")
            }
          ></Image>
          <Text style={{ fontFamily: "sans-serif-light", fontSize: 24 }}>
            800,000
          </Text>
        </View>
      </View>
      <Image
        style={{
          position: "absolute",
          width: "100%",
          height: "10%",
          bottom: 0,
        }}
        source={require("../../../assets/images/profilebackground.png")}
        resizeMode="cover"
      ></Image>
    </Container>
  );
}

export default ProfileComponent;
