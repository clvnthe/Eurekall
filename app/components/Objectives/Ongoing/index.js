import { useFonts } from "expo-font";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { objectivesData } from "../../../../assets/data/objectivesData";
import styles from "./styles";

function OngoingObjectivesComponent() {
  const theme = useTheme();
  const [objectivesRenderData, setObjectivesRenderData] =
    React.useState(objectivesData);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.objectivesWrapper}>
        <Surface
          style={[
            styles.objectivesFlatListView,
            {
              backgroundColor: theme.dark ? "#4d4b50" : "#F0FFF0",
              borderColor: theme.dark ? "#030200" : "#f1f9ec",
            },
          ]}
        >
          <Text style={{ fontFamily: "PoppinsRegular" }}>
            {item.objectiveName}
          </Text>
          <Text style={{ fontFamily: "PoppinsRegular" }}>
            0/{item.targetAmt}
          </Text>
          <Text style={{ fontFamily: "PoppinsBold" }}>{item.expAmt} exp</Text>
        </Surface>
      </View>
    );
  };

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
    <View style={{ flex: 1 }}>
      <FlatList
        data={objectivesRenderData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
}

export default OngoingObjectivesComponent;
