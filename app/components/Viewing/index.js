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
import EStyleSheet from "react-native-extended-stylesheet";
import { useFonts } from "expo-font";

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

  const [loaded] = useFonts({
    MontserratLight: require("../../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../../assets/fonts/Montserrat-Bold.ttf"),
    PoppinsMedium: require("../../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../../assets/fonts/Poppins-Light.ttf"),
    PoppinsThin: require("../../../assets/fonts/Poppins-Thin.ttf"),
    PoppinsRegular: require("../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
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
          style={[
            styles.fab,
            {
              backgroundColor: theme.colors.secondary,
            },
          ]}
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
                fontFamily: "PoppinsLight",
              },
            ]}
          >
            Create a card by pressing this button!
          </Text>
        </View>
      ) : (
        <FlatList
          data={decks[index].cards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles.footer} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  doodle: { top: "335rem", width: "300rem", height: "410rem" },
  title: {
    fontFamily: "sans-serif-thin",
    fontSize: "40rem",
    textAlign: "center",
    bottom: "250rem",
  },
  fab: {
    alignSelf: "flex-end",
    top: "614rem",
    right: "17rem",
    elevation: 6,
  },
  modal: {
    padding: "10rem",
    borderRadius: "20rem",
    borderWidth: "1rem",
    shadowOffset: { width: "1rem", height: "1rem" },
    shadowColor: "#333",
    shadowOpacity: "0.3rem",
    shadowRadius: "2rem",
    marginHorizontal: "4rem",
    marginVertical: "6rem",
    elevation: "24rem",
  },
  footer: {
    height: "100rem",
  },
});

export default ViewingComponent;
