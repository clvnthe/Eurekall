import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "decks",
  initialState: {
    content: [],
  },
  reducers: {
    deckCreated: (state, action) => {
      state.content.push(action.payload);
    },
    deckDeleted: (state, action) => {
      state.content = state.content.filter(
        (deck) => deck.id !== action.payload.id
      );
    },
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
      state.content[action.payload.index].cards[index] = {
        ...state.content[action.payload.index].cards[index],
        boxType: ++state.content[action.payload.index].cards[index].boxType,
      };
      console.log(
        "Boxtype:",
        state.content[action.payload.index].cards[index].boxType
      );
    },
    studydeckShiftCardToFront: (state, action) => {
      const card = state.content[action.payload.index].studydeck.pop();
      const index = state.content[action.payload.index].cards.findIndex(
        (curCard) => curCard.id === card.id
      );
      state.content[action.payload.index].cards[index] = {
        ...state.content[action.payload.index].cards[index],
        boxType: 1,
      };
      state.content[action.payload.index].studydeck.unshift(card);
      console.log(
        "Boxtype:",
        state.content[action.payload.index].cards[index].boxType
      );
    },
  },
});

export default slice.reducer;

const {
  deckCreated,
  deckDeleted,
  flashcardCreated,
  flashcardDeleted,
  pushedOntoStudydeck,
  studydeckPopped,
  studydeckShiftCardToFront,
} = slice.actions;

export const createDeck = (id, title, subtitle, cards, studydeck) =>
  deckCreated({ id, title, subtitle, cards, studydeck });

export const deleteDeck = (id) => deckDeleted({ id });

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
