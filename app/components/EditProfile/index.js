import { useTheme } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  Title,
  Text,
  Avatar,
  Divider,
  Surface,
  TextInput,
} from "react-native-paper";
import Container from "../common/Container";

function EditProfileComponent(props) {
  const theme = useTheme();

  return (
    <Container noPadding>
      <View
        style={{
          height: "30%",
          justifyContent: "center",
        }}
      >
        <Avatar.Image
          size={100}
          style={{ elevation: 8, alignSelf: "center" }}
          source={{
            uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe58bbba-fabe-4ca9-a574-04bb6f4d453d/d4j47k3-8983fc90-50e8-47ee-a08c-e7a31e7401ab.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZlNThiYmJhLWZhYmUtNGNhOS1hNTc0LTA0YmI2ZjRkNDUzZFwvZDRqNDdrMy04OTgzZmM5MC01MGU4LTQ3ZWUtYTA4Yy1lN2EzMWU3NDAxYWIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YbcvA7bF9G7E5gxhZuGcWw5bXoArcb_T-4z_BrmXyQ8",
          }}
        ></Avatar.Image>
        <Avatar.Icon
          style={{ position: "absolute", left: 210, top: 50, elevation: 10 }}
          size={30}
          icon="pen"
        ></Avatar.Icon>
      </View>
      <Divider></Divider>
      <Title style={{ textAlign: "center" }}>Personal info</Title>
      <Text style={{ color: "grey", padding: 10 }}>Account Information</Text>
      <TextInput
        theme={{ roundness: 20 }}
        mode="flat"
        label="Name"
        placeholder="e.g., Timothy"
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
      <TextInput
        theme={{ roundness: 20 }}
        mode="flat"
        label="Email"
        placeholder="e.g., abc@xyz.com"
        keyboardType="email-address"
        style={{
          width: 336,
          marginTop: 10,
          alignSelf: "center",
        }}
        autoCapitalize="none"
        left={
          <TextInput.Icon
            name="at"
            color={true ? theme.colors.primary : theme.colors.text}
          />
        }
      />
    </Container>
  );
}

export default EditProfileComponent;
