import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Card,
  Divider,
  IconButton,
  Menu,
  useTheme,
  Badge,
} from "react-native-paper";
import { useSelector } from "react-redux";
import { QUESTION, VIEWING } from "../../../constants/routeNames";
import * as Decks from "../../../../store/slices/deckSlice";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

function CustomCard({ title, subtitle, showAddCardModal, deleteCard, id }) {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { navigate } = useNavigation();

  const decks = useSelector(Decks.getDecks);

  const index = decks.findIndex((deck) => deck.id === id);

  const [loaded] = useFonts({
    MontserratLight: require("../../../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../../../assets/fonts/Montserrat-Bold.ttf"),
    PoppinsMedium: require("../../../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../../../assets/fonts/Poppins-Light.ttf"),
    PoppinsThin: require("../../../../assets/fonts/Poppins-Thin.ttf"),
    PoppinsRegular: require("../../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Card style={{ margin: 10, elevation: 8 }}>
        <Card.Title
          title={title}
          titleStyle={{ fontFamily: "PoppinsMedium" }}
          titleNumberOfLines={100}
          subtitle={subtitle}
          subtitleStyle={{ fontFamily: "PoppinsRegular" }}
          subtitleNumberOfLines={100}
          right={() => (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Badge
                size={30}
                style={{ backgroundColor: "transparent", alignSelf: "center" }}
              >
                {decks[index].studydeck.length ? (
                  <Entypo name="bell" size={24} color={theme.colors.text} />
                ) : (
                  <MaterialIcons
                    name="done-all"
                    size={24}
                    color={theme.colors.text}
                  />
                )}
              </Badge>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
              >
                <Menu.Item
                  onPress={() => {
                    deleteCard(id);
                  }}
                  title="Delete Deck"
                />
              </Menu>
            </View>
          )}
        />
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={() => {
                if (decks[index].studydeck.length) {
                  navigate(QUESTION, { paramIndex: index });
                  console.log("opening study page");
                } else {
                  Alert.alert("Alert", "There are no cards to be studied", [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                  ]);
                }
              }}
            >
              <Image
                source={require("../../../../assets/images/vector1.png")}
                style={styles.topVector}
              ></Image>
              <Image
                source={require("../../../../assets/images/vector2.png")}
                style={styles.bottomVector}
              ></Image>
              <Text
                style={{
                  fontFamily: "PoppinsBold",
                }}
              >
                Study
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={() => {
                navigate(VIEWING, { paramIndex: index });
                console.log("array index: ", index);
                console.log("opening view page");
              }}
            >
              <Image
                source={require("../../../../assets/images/vector3.png")}
                style={styles.topVector}
              ></Image>
              <Image
                source={require("../../../../assets/images/vector4.png")}
                style={styles.bottomVector}
              ></Image>
              <Text style={{ fontFamily: "PoppinsBold" }}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={() => {
                showAddCardModal(id);
                console.log("opening add page");
              }}
            >
              <Image
                source={require("../../../../assets/images/vector5.png")}
                style={styles.topVector}
              ></Image>
              <Image
                source={require("../../../../assets/images/vector6.png")}
                style={styles.bottomVector}
              ></Image>
              <Text style={{ fontFamily: "PoppinsBold" }}>Add Card</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  touchableButton: {
    height: 92,
    width: 100,
    borderRadius: 10,
    backgroundColor: "#FBF4E2",
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  topVector: { top: 5, height: 32, width: 32, position: "absolute" },
  bottomVector: { bottom: 5, height: 32, width: 32, position: "absolute" },
});

export default CustomCard;
