import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
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
      <View
        style={{
          height: "30%",
        }}
      >
        <ImageBackground
          style={{ height: "100%", justifyContent: "center" }}
          resizeMode="cover"
          source={{
            uri: "https://images.unsplash.com/photo-1506102383123-c8ef1e872756?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              alignSelf: "flex-end",
              right: 10,
              bottom: 10,
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
            size={100}
            style={{ elevation: 8, alignSelf: "center" }}
            source={{
              uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe58bbba-fabe-4ca9-a574-04bb6f4d453d/d4j47k3-8983fc90-50e8-47ee-a08c-e7a31e7401ab.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZlNThiYmJhLWZhYmUtNGNhOS1hNTc0LTA0YmI2ZjRkNDUzZFwvZDRqNDdrMy04OTgzZmM5MC01MGU4LTQ3ZWUtYTA4Yy1lN2EzMWU3NDAxYWIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YbcvA7bF9G7E5gxhZuGcWw5bXoArcb_T-4z_BrmXyQ8",
            }}
          ></Avatar.Image>
        </ImageBackground>
      </View>
      <Divider style={{ height: 2 }}></Divider>
      <Title
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
          fontFamily: "sans-serif",
          marginBottom: -5,
        }}
      >
        {userInfo[1]}
      </Title>
      <Subheading
        style={{
          textAlign: "center",
          fontFamily: "sans-serif-light",
        }}
      >
        {userInfo[0]}
      </Subheading>
    </Container>
  );
  /*return (
    <View style={{ height: "100%", justifyContent: "center" }}>
      <Text style={{ textAlign: "center", color: theme.colors.text }}>
        Profile Page
      </Text>
    </View>
  );*/
}

export default ProfileComponent;
