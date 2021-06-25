import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Platform,
} from "react-native";
import { Title, Text, Divider, TextInput } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import Container from "../common/Container";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import CustomButton from "../common/CustomButton";

function EditProfileComponent(props) {
  const theme = useTheme();
  const [image, setImage] = useState(
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe58bbba-fabe-4ca9-a574-04bb6f4d453d/d4j47k3-8983fc90-50e8-47ee-a08c-e7a31e7401ab.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZlNThiYmJhLWZhYmUtNGNhOS1hNTc0LTA0YmI2ZjRkNDUzZFwvZDRqNDdrMy04OTgzZmM5MC01MGU4LTQ3ZWUtYTA4Yy1lN2EzMWU3NDAxYWIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YbcvA7bF9G7E5gxhZuGcWw5bXoArcb_T-4z_BrmXyQ8"
  );

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
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center", padding: 20 }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
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
          label="Username"
          placeholder="e.g., TheLegend27"
          style={{
            width: 336,
            marginTop: 10,
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
        <View style={{ alignItems: "center" }}>
          <CustomButton
            title="Submit changes"
            width={336}
            onPress={() => console.log("pressed")}
          />
        </View>
      </Animated.View>
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
