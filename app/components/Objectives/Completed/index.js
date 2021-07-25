import { useFonts } from "expo-font";
import React from "react";
import {FlatList, Image, Text, View} from "react-native";
import styles from "./styles";
import {objectivesData} from "../../../../assets/data/objectivesData";
import { Surface, useTheme } from "react-native-paper";

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
  const theme = useTheme();
  const [objectivesRenderData, setObjectivesRenderData] =
      React.useState(objectivesData);
  const objectiveDoneFilter = (objectives) => {
      return objectives.filter((objective) => objective.collected === true)
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
                    <Text style={{ fontFamily: "PoppinsRegular" }}>
                        {item.objectiveName}
                    </Text>
                    <Text style={{ fontFamily: "PoppinsBold" }}>{item.expAmt} exp</Text>
                </Surface>
            </View>
        );
  };

  if (!loaded) {
    return null;
  }

    if (objectiveDoneFilter(objectivesRenderData).length === 0){
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
