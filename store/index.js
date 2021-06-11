import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import decksReducer from "./slices/deckSlice";

const store = configureStore({
  reducer: combineReducers({
    decks: decksReducer,
  }),
  middleware: applyMiddleware(thunk),
});

export default store;
