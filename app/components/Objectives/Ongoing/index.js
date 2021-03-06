import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { objectivesData } from "../../../../assets/data/objectivesData";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function OngoingObjectivesComponent({ route }) {
  const theme = useTheme();
  const [objectivesRenderData, setObjectivesRenderData] = React.useState(
    route.params.data
  );
  const objectiveCollectedFilter = (objectives) => {
    return objectives.filter((objective) => objective.collected === false);
  };

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
          <Text
            style={{ fontFamily: "PoppinsRegular", color: theme.colors.text }}
          >
            {item.objectiveName}
          </Text>
          <MaterialCommunityIcons
            name={item.iconName}
            size={24}
            color={theme.dark ? "white" : "black"}
          />
          <Text style={{ fontFamily: "PoppinsBold", color: theme.colors.text }}>
            {item.expAmt} exp
          </Text>
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

  if (objectiveCollectedFilter(objectivesRenderData).length === 0) {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
      >
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
  } else {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={objectiveCollectedFilter(objectivesRenderData)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
    );
  }
}

export default OngoingObjectivesComponent;
