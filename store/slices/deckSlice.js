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
  },
});

export default slice.reducer;

const { deckCreated, deckDeleted } = slice.actions;

export const createDeck = (id, title, subtitle) =>
  deckCreated({ id, title, subtitle });

export const deleteDeck = (id) => deckDeleted({ id });

export const getDecks = createSelector(
  (state) => state.decks,
  (decks) => decks.content
);
