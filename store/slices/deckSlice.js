import { createSelector, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "decks",
  initialState: {
    content: [
      {
        id: "123",
        title: "CS2030",
        subtitle: "Programming Methodology II",
        cards: [
          {
            id: "1",
            question: "How many legs does a spider have?",
            answer: "Eight",
            boxType: 1,
          },
          {
            id: "2",
            question: "What is a concrete class?",
            answer:
              "A concrete class is a class that has an implementation for all of its functions",
            boxType: 1,
          },
        ],
        studydeck: [
          {
            id: "1",
            question: "How many legs does a spider have?",
            answer: "Eight",
          },
          {
            id: "2",
            question: "What is a concrete class?",
            answer:
              "A concrete class is a class that has an implementation for all of its functions",
          },
        ],
      },
    ],
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
    studydeckCreated: (state, action) => {
      state.content[action.payload.index].studydeck.push({
        id: action.payload.card.id,
        question: action.payload.card.question,
        answer: action.payload.card.answer,
      });
    },
    studydeckPopped: (state, action) => {
      state.content[action.payload.index].studydeck.pop();
    },
  },
});

export default slice.reducer;

const {
  deckCreated,
  deckDeleted,
  flashcardCreated,
  flashcardDeleted,
  studydeckCreated,
  studydeckPopped,
} = slice.actions;

export const createDeck = (id, title, subtitle, cards, studydeck) =>
  deckCreated({ id, title, subtitle, cards, studydeck });

export const deleteDeck = (id) => deckDeleted({ id });

export const createFlashcard = (index, card) =>
  flashcardCreated({ index, card });

export const deleteFlashcard = (index, cardID) =>
  flashcardDeleted({ index, cardID });

export const createStudydeck = (index, card) =>
  studydeckCreated({ index, card });

export const popStudydeck = (index) => studydeckPopped({ index });

export const getDecks = createSelector(
  (state) => state.decks,
  (decks) => decks.content
);
