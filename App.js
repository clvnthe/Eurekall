import "react-native-gesture-handler";
import React from "react";

import AppNavContainer from "./app/navigations";
import { Provider } from "react-redux";
import store from "./store";
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function App() {
  return (
    <Provider store={store}>
      <AppNavContainer />
    </Provider>
  );
}

export default App;
