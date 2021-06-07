import React from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar, Portal, Modal, FAB, useTheme } from "react-native-paper";
import ReviewFormComponent from "../common/reviewForm";
import CustomCard from "../common/CustomCard";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Decks from "../../../store/slices/deckSlice";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

function HomeComponent(props) {
  const dispatch = useDispatch();
  const decks = useSelector(Decks.getDecks);

  const createDeckHandler = (title, subtitle) => {
    dispatch(Decks.createDeck(nanoid(), title, subtitle));
    setVisible(false);
  };

  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const deleteDeckHandler = (id) => {
    dispatch(Decks.deleteDeck(id));
  };

  const renderItem = (deck) => (
    <CustomCard
      title={deck.item.title}
      subtitle={deck.item.subtitle}
      deleteCard={deleteDeckHandler}
      id={deck.item.id}
    />
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        ...props.style,
      }}
      {...props}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        style={theme.dark ? "light" : "dark"}
      />
      <View
        style={{
          height: 50,
          margin: 16,
          marginRight: 40,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text style={{ fontSize: 32, fontFamily: "sans-serif-light" }}>
          Here are your decks
        </Text>
      </View>
      <FlatList
        ListHeaderComponent={
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                backgroundColor: theme.colors.background,
                borderWidth: 1,
                borderColor: theme.colors.surface,
                padding: 10,
                fontSize: 18,
                borderRadius: 6,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: "#333",
                shadowOpacity: 0.3,
                shadowRadius: 2,
                marginHorizontal: 4,
                marginVertical: 6,
              }}
            >
              <ReviewFormComponent createDeckHandler={createDeckHandler} />
            </Modal>
            <FAB
              style={{
                alignSelf: "flex-end",
                margin: 16,
                bottom: -550,
                backgroundColor: theme.colors.secondary,
              }}
              icon="plus"
              color={theme.colors.onPrimary}
              onPress={showModal}
            />
          </Portal>
        }
        data={decks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default HomeComponent;
