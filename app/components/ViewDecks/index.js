import React, { useEffect, useState } from "react";
import { Portal, Modal, FAB, useTheme } from "react-native-paper";
import ReviewFormComponent from "../common/reviewForm";
import FlashCardForm from "../common/flashcardForm";
import CustomCard from "../common/CustomCard";
import { FlatList, SafeAreaView, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Decks from "../../../store/slices/deckSlice";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { useIsFocused } from "@react-navigation/core";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DeckComponent(props) {
  const dispatch = useDispatch();
  const decks = useSelector(Decks.getDecks);
  const [empty, setEmpty] = useState(!decks.length);
  const [index, setIndex] = useState("");

  const createDeckHandler = (title, subtitle) => {
    dispatch(Decks.createDeck(nanoid(), title, subtitle, [], []));
    setVisible(false);
    if (decks.length === 0) {
      setEmpty(false);
    }
  };

  const isFocused = useIsFocused();

  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [visibleAddCardModal, setVisibleAddCardModal] = useState(false);
  const showAddCardModal = (id) => {
    setIndex(decks.findIndex((deck) => deck.id === id));
    setVisibleAddCardModal(true);
  };
  const hideAddCardModal = () => setVisibleAddCardModal(false);

  const createFlashcardHandler = (question, answer) => {
    const card = {
      id: nanoid(),
      question,
      answer,
      boxType: 1,
    };
    dispatch(Decks.createFlashcard(index, card));
    dispatch(Decks.pushOntoStudydeck(index, card));
    setVisibleAddCardModal(false);
  };

  const deleteDeckHandler = (id) => {
    dispatch(Decks.deleteDeck(id));
    if (decks.length === 1) {
      setEmpty(true);
    }
  };

  const renderItem = (deck) => (
    <CustomCard
      title={deck.item.title}
      subtitle={deck.item.subtitle}
      showAddCardModal={showAddCardModal}
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
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{
            justifyContent: "center",
          }}
          contentContainerStyle={[
            styles.modal,
            {
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          <ReviewFormComponent createDeckHandler={createDeckHandler} />
        </Modal>
        <Modal
          visible={visibleAddCardModal}
          onDismiss={hideAddCardModal}
          contentContainerStyle={[
            styles.modal,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.surface,
            },
          ]}
        >
          <FlashCardForm createFlashcardHandler={createFlashcardHandler} />
        </Modal>
        <FAB
          visible={isFocused}
          style={[styles.fab, { backgroundColor: theme.colors.secondary }]}
          icon="plus"
          color={theme.colors.onPrimary}
          onPress={showModal}
        />
      </Portal>
      {empty ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../../assets/images/emptydoodle.png")}
            style={styles.doodle}
          ></Image>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
              },
            ]}
          >
            hmm it seems there are no decks added yet, create a deck by pressing
            this button!
          </Text>
        </View>
      ) : (
        <FlatList
          data={decks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={500}
        />
      )}
    </SafeAreaView>
  );
}

export default DeckComponent;
