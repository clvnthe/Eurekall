import React, { useState } from "react";
import { FlatList, SafeAreaView, View, Image, Text } from "react-native";
import { FAB, Modal, Portal, useTheme } from "react-native-paper";
import FlashCard from "../common/FlashCard";
import FlashCardForm from "../common/flashcardForm";
import { useDispatch, useSelector } from "react-redux";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { useIsFocused } from "@react-navigation/core";
import * as Decks from "../../../store/slices/deckSlice";

function ViewingComponent({ route }) {
  const isFocused = useIsFocused();
  const index = route.params.paramIndex;

  const decks = useSelector(Decks.getDecks);
  const [empty, setEmpty] = useState(!decks[index].cards.length);

  const theme = useTheme();

  const dispatch = useDispatch();

  const createFlashcardHandler = (question, answer) => {
    const card = {
      id: nanoid(),
      question,
      answer,
      boxType: 1,
    };
    dispatch(Decks.createFlashcard(index, card));
    dispatch(Decks.pushOntoStudydeck(index, card));
    setVisible(false);
    if (decks[index].cards.length === 0) {
      setEmpty(false);
    }
  };

  const deleteFlashcardHandler = (id) => {
    dispatch(Decks.deleteFlashcard(index, id));
    if (decks[index].cards.length === 1) {
      setEmpty(true);
    }
  };

  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const renderItem = (flashcard) => (
    <FlashCard
      question={flashcard.item.question}
      answer={flashcard.item.answer}
      id={flashcard.item.id}
      deleteCard={deleteFlashcardHandler}
    />
  );

  return (
    <SafeAreaView>
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
            elevation: 24,
          }}
        >
          <FlashCardForm createFlashcardHandler={createFlashcardHandler} />
        </Modal>
        <FAB
          visible={isFocused}
          style={{
            alignSelf: "flex-end",
            top: 580,
            right: 16,
            backgroundColor: theme.colors.secondary,
          }}
          icon="plus"
          color={theme.colors.onPrimary}
          onPress={showModal}
        />
      </Portal>
      {empty ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../../../assets/images/emptydoodle.png")}
            style={{ top: 320, width: 288, height: 388 }}
          ></Image>
          <Text
            style={{
              fontFamily: "sans-serif-thin",
              fontSize: 36,
              textAlign: "center",
              bottom: 250,
              width: 363,
              color: theme.colors.text,
            }}
          >
            hmm it seems there are no cards added yet, create a card by pressing
            this button!
          </Text>
        </View>
      ) : (
        <FlatList
          data={decks[index].cards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

export default ViewingComponent;
