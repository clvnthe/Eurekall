import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  FAB,
  Modal,
  Portal,
  useTheme,
  Title,
} from "react-native-paper";
import FlashCard from "../common/FlashCard";
import FlashCardForm from "../common/flashcardForm";
import { useDispatch, useSelector } from "react-redux";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { useIsFocused } from "@react-navigation/core";
import * as Decks from "../../../store/slices/deckSlice";
import { useFonts } from "expo-font";
import firebase from "firebase";
import { ScaledSheet } from "react-native-size-matters";

const firebaseConfig = {
  apiKey: "AIzaSyAq9csfcFvRvMPS-kEjBN1IJ5iL0Sfvn2w",
  authDomain: "eurekall.firebaseapp.com",
  projectId: "eurekall",
  storageBucket: "eurekall.appspot.com",
  messagingSenderId: "132679568347",
  appId: "1:132679568347:web:5fb1b1b852eefc092cf5fe",
  measurementId: "G-H1N45TFCSX",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
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

  const createCardDatabase = async (
    question,
    answer,
    id,
    cardId,
    currentDate
  ) => {
    const userEmail = String(await fireauth.currentUser.email);
    const deckRef = firestore
      .collection("users")
      .doc(userEmail)
      .collection("decks")
      .doc(id)
      .collection("cards")
      .doc(cardId);
    await deckRef.set({
      question: question,
      answer: answer,
      boxType: 1,
      id: cardId,
      date: currentDate,
    });
  };

  const createFlashcardHandler = (question, answer) => {
    const currentDate =
      String(new Date().getFullYear()) +
      "/" +
      String(new Date().getMonth() + 1) +
      "/" +
      String(new Date().getDate());
    const id = nanoid();
    const card = {
      id: id,
      question,
      answer,
      boxType: 1,
    };
    createCardDatabase(question, answer, decks[index]["id"], id, currentDate);
    dispatch(Decks.createFlashcard(index, card));
    dispatch(Decks.pushOntoStudydeck(index, card));
    setVisible(false);
    if (decks[index].cards.length === 0) {
      setEmpty(false);
    }
  };

  const deleteCardDatabase = async (id, index) => {
    const userEmail = String(await fireauth.currentUser.email);
    await firestore
      .collection("users")
      .doc(userEmail)
      .collection("decks")
      .doc(decks[index]["id"])
      .collection("cards")
      .doc(id)
      .delete();
  };

  const deleteFlashcardHandler = (id) => {
    deleteCardDatabase(id, index);
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

  const [visibleHelp, setVisibleHelp] = React.useState(false);
  const showHelpModal = () => {
    setVisibleHelp(true);
  };
  const hideHelpModal = () => setVisibleHelp(false);

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
    <SafeAreaView style={{ flex: 1 }}>
      <Portal>
        <Modal
          visible={visibleHelp}
          onDismiss={hideHelpModal}
          contentContainerStyle={[
            styles.modal,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.surface,
            },
          ]}
        >
          <Title style={{ fontFamily: "PoppinsBold" }}>Help</Title>
          <Text
            style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
          >
            1) To create a card, press on "+" button on the bottom right.
            {"\n"}
            {"\n"}2) To delete a card, press and hold on the card. An alert will
            appear to prompt you of the deletion. {"\n"}
            {"\n"}3) To flip a card, simply tap on the card.{"\n"}
          </Text>
        </Modal>
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
          visible={!visibleHelp && !visible && isFocused}
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
      <View style={styles.helpIconView}>
        <TouchableOpacity onPress={showHelpModal}>
          <Avatar.Icon icon="account-question" size={26} />
        </TouchableOpacity>
      </View>
      {empty ? (
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
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
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Image
              source={require("../../../assets/images/emptydoodle_cropped.png")}
              style={styles.doodle}
              resizeMode="contain"
            ></Image>
          </View>
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

const styles = ScaledSheet.create({
  helpIconView: {
    height: "5%",
    alignSelf: "flex-end",
    justifyContent: "center",
    marginRight: "5%",
    marginTop: "2%",
  },
  doodle: {
    //top: "300@s",
    width: "275@s",
    //height: "290@s",
    top: "15%",
    flex: 1,
  },
  title: {
    fontSize: "39@s",
    textAlign: "center",
    //bottom: "230@s",
  },
  fab: {
    alignSelf: "flex-end",
    top: "80%",
    right: "5%",
    elevation: 6,
  },
  modal: {
    padding: "10@s",
    borderRadius: "20@s",
    borderWidth: "1@s",
    shadowOffset: { width: "1@s", height: "1@s" },
    shadowColor: "#333",
    shadowOpacity: "0.3@s",
    shadowRadius: "2@s",
    marginHorizontal: "4@s",
    marginVertical: "6@s",
    elevation: "24@s",
  },
  footer: {
    height: "130@s",
  },
});

export default ViewingComponent;
