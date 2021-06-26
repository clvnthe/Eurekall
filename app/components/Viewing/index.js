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
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAq9csfcFvRvMPS-kEjBN1IJ5iL0Sfvn2w",
  authDomain: "eurekall.firebaseapp.com",
  projectId: "eurekall",
  storageBucket: "eurekall.appspot.com",
  messagingSenderId: "132679568347",
  appId: "1:132679568347:web:5fb1b1b852eefc092cf5fe",
  measurementId: "G-H1N45TFCSX"
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
const firestore = firebase.firestore();
const fireauth = firebase.auth();



function ViewingComponent({ route }) {
  const isFocused = useIsFocused();
  const index = route.params.paramIndex;

  const decks = useSelector(Decks.getDecks);
  const [empty, setEmpty] = useState(!decks[index].cards.length);

  const theme = useTheme();

  const dispatch = useDispatch();

  const createCardDatabase = async (question,answer,id,cardId,currentDate) => {
    const userEmail = String(await fireauth.currentUser.email);
    const deckRef = firestore.collection('users').doc(userEmail).
    collection('decks').doc(id).collection('cards').doc(cardId);
    await deckRef.set({
      question: question,
      answer: answer,
      boxType: 1,
      id: cardId,
      date: currentDate
    })
  }

  const createFlashcardHandler = (question, answer) => {
    const currentDate = String(new Date().getFullYear()) + '/' + String(new Date().getMonth() + 1) + '/' + String(new Date().getDate());
    const id = nanoid()
    const card = {
      id: id,
      question,
      answer,
      boxType: 1,
    };
    createCardDatabase(question,answer,decks[index]["id"],id,currentDate);
    dispatch(Decks.createFlashcard(index, card));
    dispatch(Decks.pushOntoStudydeck(index, card));
    setVisible(false);
    if (decks[index].cards.length === 0) {
      setEmpty(false);
    }
  };

  const deleteCardDatabase = async (id,index) => {
    const userEmail = String(await fireauth.currentUser.email);
    await firestore.collection('users').doc(userEmail)
        .collection('decks').doc(decks[index]["id"])
        .collection('cards').doc(id).delete();
  }

  const deleteFlashcardHandler = (id) => {
    deleteCardDatabase(id,index);
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
              },
            ]}
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
});

export default ViewingComponent;
