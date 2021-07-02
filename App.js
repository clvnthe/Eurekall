import "react-native-gesture-handler";
import React from "react";

import AppNavContainer from "./app/navigations";
import { Provider } from "react-redux";
import store from "./store";
import EStyleSheet from "react-native-extended-stylesheet";
import { LogBox, Dimensions } from "react-native";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  //to cache pre-load and cache Assets
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./assets/images/cover_dark.png"),
      require("./assets/images/cover.png"),
      require("./assets/images/emptydoodle.png"),
      require("./assets/images/eurekall_logo.png"),
      require("./assets/images/eurekall_whitelogo.png"),
      require("./assets/images/eurekall_whitelogo2.png"),
      require("./assets/images/forgotpassworddoodle.png"),
      require("./assets/images/loginbackground.png"),
      require("./assets/images/logindoodle.png"),
      require("./assets/images/loginhomedoodle.png"),
      require("./assets/images/registerdoodle.png"),
      require("./assets/images/vector1.png"),
      require("./assets/images/vector2.png"),
      require("./assets/images/vector3.png"),
      require("./assets/images/vector4.png"),
      require("./assets/images/vector5.png"),
      require("./assets/images/vector6.png"),
    ]);

    //const fontAssets = cacheFonts([FontAwesome.font]);

    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    //temp fix to get rid of timer warnings
    LogBox.ignoreLogs(["Setting a timer"]);

    return (
      <Provider store={store}>
        <AppNavContainer />
      </Provider>
    );
  }
}
