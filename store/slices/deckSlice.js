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
      const cards = String(state.content[action.payload.index].cards);
      if (cards === "undefined") {
        state.content[action.payload.index] = {
          ...state.content[action.payload.index],
          cards: [],
        };
      }
      state.content[action.payload.index].cards.push({
        id: action.payload.cardID,
        question: action.payload.question,
        answer: action.payload.answer,
      });
    },
    flashcardDeleted: (state, action) => {
      state.content[action.payload.index].cards = state.content[
        action.payload.index
      ].cards.filter((card) => card.id !== action.payload.cardID);
    },
  },
});

export default slice.reducer;

const { deckCreated, deckDeleted, flashcardCreated, flashcardDeleted } =
  slice.actions;

export const createDeck = (id, title, subtitle) =>
  deckCreated({ id, title, subtitle });

export const deleteDeck = (id) => deckDeleted({ id });

export const createFlashcard = (index, cardID, question, answer) =>
  flashcardCreated({ index, cardID, question, answer });

export const deleteFlashcard = (index, cardID) =>
  flashcardDeleted({ index, cardID });

export const getDecks = createSelector(
  (state) => state.decks,
  (decks) => decks.content
);
