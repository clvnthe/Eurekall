import { createSelector, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase";

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
const currentDate =
  String(new Date().getFullYear()) +
  "/" +
  String(new Date().getMonth() + 1) +
  "/" +
  String(new Date().getDate());

const updateCard = async (deckId, cardId, boxTypeValue, dateValue) => {
  const userId = String(fireauth.currentUser.email);
  const updateCardRef = firestore
    .collection("users")
    .doc(userId)
    .collection("decks")
    .doc(deckId)
    .collection("cards")
    .doc(cardId);
  const updateBoxRef = firestore.collection("users").doc(userId);
  try {
    await updateCardRef.update({
      boxType: boxTypeValue,
      date: dateValue,
    });
    if (boxTypeValue === 1) {
      await updateBoxRef.update({
        "stats.box1Cards": firebase.firestore.FieldValue.increment(1),
      });
    } else if (boxTypeValue === 2) {
      await updateBoxRef.update({
        "stats.box2Cards": firebase.firestore.FieldValue.increment(1),
      });
    } else if (boxTypeValue === 3) {
      await updateBoxRef.update({
        "stats.box3Cards": firebase.firestore.FieldValue.increment(1),
      });
    } else if (boxTypeValue === 4) {
      await updateBoxRef.update({
        "stats.box4Cards": firebase.firestore.FieldValue.increment(1),
      });
    } else if (boxTypeValue === 5) {
      await updateBoxRef.update({
        "stats.box5Cards": firebase.firestore.FieldValue.increment(1),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  content: [],
};

const slice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    deckCreated: (state, action) => {
      state.content.push(action.payload);
    },
    deckDeleted: (state, action) => {
      state.content = state.content.filter(
        (deck) => deck.id !== action.payload.id
      );
    },
    deckStateResetted: () => initialState,
    flashcardCreated: (state, action) => {
      state.content[action.payload.index].cards.push({
        id: action.payload.card.id,
        question: action.payload.card.question,
        answer: action.payload.card.answer,
        boxType: action.payload.card.boxType,
      });
    },
    flashcardDeleted: (state, action) => {
      state.content[action.payload.index].cards = state.content[
        action.payload.index
      ].cards.filter((card) => card.id !== action.payload.cardID);
      state.content[action.payload.index].studydeck = state.content[
        action.payload.index
      ].studydeck.filter((card) => card.id !== action.payload.cardID);
    },
    pushedOntoStudydeck: (state, action) => {
      state.content[action.payload.index].studydeck.push({
        id: action.payload.card.id,
        question: action.payload.card.question,
        answer: action.payload.card.answer,
      });
    },
    studydeckPopped: (state, action) => {
      const card = state.content[action.payload.index].studydeck.pop();
      const index = state.content[action.payload.index].cards.findIndex(
        (curCard) => curCard.id === card.id
      );
      const boxTypeValue = ++state.content[action.payload.index].cards[index]
        .boxType;
      state.content[action.payload.index].cards[index] = {
        ...state.content[action.payload.index].cards[index],
        boxType: boxTypeValue,
        date: currentDate,
      };
      const cardId = state.content[action.payload.index].cards[index].id;
      const deckId = state.content[action.payload.index].id;
      updateCard(deckId, cardId, boxTypeValue, currentDate);
      console.log(
        "Boxtype:",
        state.content[action.payload.index].cards[index].boxType,
        "date:",
        state.content[action.payload.index].cards[index].date
      );
    },
    studydeckShiftCardToFront: (state, action) => {
      const card = state.content[action.payload.index].studydeck.pop();
      const index = state.content[action.payload.index].cards.findIndex(
        (curCard) => curCard.id === card.id
      );
      state.content[action.payload.index].cards[index] = {
        ...state.content[action.payload.index].cards[index],
        boxType: 0,
        date: currentDate,
      };
      state.content[action.payload.index].studydeck.unshift(card);
      console.log(
        "Boxtype:",
        state.content[action.payload.index].cards[index].boxType,
        "date:",
        state.content[action.payload.index].cards[index].date
      );
    },
  },
});

export default slice.reducer;

const {
  deckCreated,
  deckDeleted,
  deckStateResetted,
  flashcardCreated,
  flashcardDeleted,
  pushedOntoStudydeck,
  studydeckPopped,
  studydeckShiftCardToFront,
} = slice.actions;

export const createDeck = (id, title, subtitle, cards, studydeck) =>
  deckCreated({ id, title, subtitle, cards, studydeck });

export const deleteDeck = (id) => deckDeleted({ id });

export const resetDeckState = () => deckStateResetted();

export const createFlashcard = (index, card) =>
  flashcardCreated({ index, card });

export const deleteFlashcard = (index, cardID) =>
  flashcardDeleted({ index, cardID });

export const pushOntoStudydeck = (index, card) =>
  pushedOntoStudydeck({ index, card });

export const popStudydeck = (index) => studydeckPopped({ index });

export const shiftItemToFrontStudydeck = (index) =>
  studydeckShiftCardToFront({ index });

export const getDecks = createSelector(
  (state) => state.decks,
  (decks) => decks.content
);
