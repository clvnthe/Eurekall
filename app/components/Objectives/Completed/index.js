import { useFonts } from "expo-font";
import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";

function CompletedObjectivesComponent(props) {
  const [loaded] = useFonts({
    MontserratLight: require("../../../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../../../assets/fonts/Montserrat-Bold.ttf"),
    PoppinsMedium: require("../../../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../../../assets/fonts/Poppins-Light.ttf"),
    PoppinsThin: require("../../../../assets/fonts/Poppins-Thin.ttf"),
    PoppinsRegular: require("../../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
      <Text style={{ fontFamily: "PoppinsMedium" }}>
        finally some peace and quiet
      </Text>
      <Image
        source={require("../../../../assets/images/eastwood-come-back-later.png")}
        style={styles.imageWrapper}
        resizeMode="contain"
      ></Image>
    </View>
  );
}

export default CompletedObjectivesComponent;
