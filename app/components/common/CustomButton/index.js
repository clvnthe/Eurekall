import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

import colors from "../../../../assets/theme/colors";
import styles from "./styles";
import { useFonts } from "expo-font";

function CustomButton({
  title,
  primary,
  secondary,
  danger,
  loading,
  disabled,
  onPress,
  bgColor,
  width,
}) {
  const theme = useTheme();
  const getBgColor = () => {
    if (disabled) {
      return colors.grey;
    }
    if (primary) {
      return colors.primary;
    }
    if (danger) {
      return colors.danger;
    }
    if (secondary) {
      return colors.secondary;
    }
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
    <View style={styles.inputContainer}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.wrapper,
          { backgroundColor: bgColor ? bgColor : theme.colors.primary },
        ]}
      >
        <View style={styles.loadingSection}>
          {loading && <ActivityIndicator color={colors.primary} />}
          {title && (
            <Text
              style={{
                color: theme.dark ? theme.colors.onPrimary : "#ffffff",
                paddingLeft: loading ? 5 : 0,
                fontFamily: "PoppinsRegular",
              }}
            >
              {title}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CustomButton;
