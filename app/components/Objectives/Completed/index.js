import { useFonts } from "expo-font";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import styles from "./styles";
import { objectivesData } from "../../../../assets/data/objectivesData";
import { Surface, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CompletedObjectivesComponent({ route }) {
  console.log(route);

  const [loaded] = useFonts({
    MontserratLight: require("../../../../assets/fonts/Montserrat-Light.ttf"),
    MontserratBold: require("../../../../assets/fonts/Montserrat-Bold.ttf"),
    PoppinsMedium: require("../../../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsBold: require("../../../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../../../assets/fonts/Poppins-Light.ttf"),
    PoppinsThin: require("../../../../assets/fonts/Poppins-Thin.ttf"),
    PoppinsRegular: require("../../../../assets/fonts/Poppins-Regular.ttf"),
  });
  const theme = useTheme();
  const [objectivesRenderData, setObjectivesRenderData] =
    React.useState(objectivesData);
  const completedIDs = route.params.completedIDs;
  const collectedObjectives = route.params.data.filter(
    (objective) => objective.collected === true
  );
  const objectiveDoneFilter = (objectives) => {
    return collectedObjectives.concat(
      objectives.filter((objective) => completedIDs.includes(objective.id))
    );
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

  if (!loaded) {
    return null;
  }

  if (objectiveDoneFilter(objectivesRenderData).length === 0) {
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
          data={objectiveDoneFilter(objectivesRenderData)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </View>
    );
  }
}

export default CompletedObjectivesComponent;
