import { createSelector, createSlice } from "@reduxjs/toolkit";

const flashcardSlice = createSlice({
  name: "flashcards",
  initialState: {
    content: [],
  },
  reducers: {
    flashcardCreated: (state, action) => {
      state.content.push(action.payload);
    },
    flashcardDeleted: (state, action) => {
      state.content = state.content.filter(
        (flashcard) => flashcard.id !== action.payload.id
      );
    },
  },
});

export default flashcardSlice.reducer;

const { flashcardCreated, flashcardDeleted } = flashcardSlice.actions;

export const createFlashcard = (id, question, answer) =>
  flashcardCreated({ id, question, answer });

export const deleteFlashcard = (id) => flashcardDeleted({ id });

export const getFlashcards = createSelector(
  (state) => state.flashcards,
  (flashcards) => flashcards.content
);
