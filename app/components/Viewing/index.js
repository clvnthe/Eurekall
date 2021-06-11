import React from "react";
import { FlatList, SafeAreaView } from "react-native";
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

  const theme = useTheme();

  const dispatch = useDispatch();
  const decks = useSelector(Decks.getDecks);

  const createFlashcardHandler = (question, answer) => {
    dispatch(
      Decks.createFlashcard(route.params.paramIndex, nanoid(), question, answer)
    );
    setVisible(false);
  };

  const deleteFlashcardHandler = (id) => {
    dispatch(Decks.deleteFlashcard(route.params.paramIndex, id));
  };

  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
    console.log(decks);
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
        }
        data={decks[route.params.paramIndex].cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default ViewingComponent;
