import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import decksReducer from "./slices/deckSlice";
import flashcardsReducer from "./slices/flashcardSlice";

const store = configureStore({
  reducer: combineReducers({
    decks: decksReducer,
    flashcards: flashcardsReducer,
  }),
  middleware: applyMiddleware(thunk),
});

export default store;
