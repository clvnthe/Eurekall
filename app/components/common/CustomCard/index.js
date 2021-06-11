import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card, Divider, IconButton, Menu, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { QUESTION, VIEWING } from "../../../constants/routeNames";
import * as Decks from "../../../../store/slices/deckSlice";

function CustomCard({ title, subtitle, deleteCard, id }) {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { navigate } = useNavigation();

  const decks = useSelector(Decks.getDecks);

  const index = decks.findIndex((deck) => deck.id === id);

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Card style={{ margin: 10, elevation: 1 }}>
        <Card.Title
          title={title}
          subtitle={subtitle}
          right={() => (
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
                navigate(QUESTION);
                console.log("opening study page");
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
              <Text style={{ fontWeight: "bold", position: "absolute" }}>
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
              <Text style={{ fontWeight: "bold" }}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableButton}
              onPress={() => console.log("opening add page")}
            >
              <Image
                source={require("../../../../assets/images/vector5.png")}
                style={styles.topVector}
              ></Image>
              <Image
                source={require("../../../../assets/images/vector6.png")}
                style={styles.bottomVector}
              ></Image>
              <Text style={{ fontWeight: "bold" }}>Add</Text>
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
