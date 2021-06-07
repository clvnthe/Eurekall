import "react-native-gesture-handler";
import React from "react";

import AppNavContainer from "./app/navigations";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <AppNavContainer />
    </Provider>
  );
}

export default App;
