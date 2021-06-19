// import { useNavigation } from "@react-navigation/core";
// import React from "react";
// import { Image, View, Text, TouchableOpacity } from "react-native";
// import { HelperText, TextInput } from "react-native-paper";
//
// import { LOGIN, RESETPASSWORD } from "../../constants/routeNames";
// import CustomButton from "../common/CustomButton";
// import styles from "./styles";
// import colors from "../../../assets/theme/colors";
// import Container from "../common/Container";
// import { useRoute, useTheme } from "@react-navigation/native";
// import Amplify, { Auth } from "aws-amplify";
// import awsconfig from "../../../src/aws-exports";
// Amplify.configure(awsconfig);
//
// function ResetPasswordComponent() {
//   const [password, setPassword] = React.useState("");
//   const { key, username } = useRoute().params;
//   const [confirmationCode, setConfirmationCode] = React.useState("");
//   const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
//   const passwordTextInput = React.useRef();
//   const [loading, setLoading] = React.useState(false);
//   const theme = useTheme();
//
//   const { navigate } = useNavigation();
//
//   const hasText = (text) => {
//     return text.length > 0 && text.length < 6;
//   };
//
//   // For AWS reset Password
//   function resetPassword() {
//     setLoading(true);
//     Auth.forgotPasswordSubmit(username.toString(), confirmationCode, password)
//       .then((data) => console.log(data))
//       .then(() => {
//         console.log("reset fully successful");
//         setLoading(false);
//         setIsSignInHelperTextVisible(false);
//       })
//       .then(() => navigate(LOGIN))
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//         setIsSignInHelperTextVisible(true);
//       });
//   }
//
//   //FOR ERROR MESSAGES*********************/START
//   const [isHelperTextVisible, setIsHelperTextVisible] = React.useState(false);
//   const [isSignInHelperTextVisible, setIsSignInHelperTextVisible] =
//     React.useState(false);
//
//   const confirmationCodeHasErrors = (text) => {
//     return text.length != 6;
//   };
//
//   const passwordHasErrors = (text) => {
//     if (text.length == 0) {
//       return true;
//     } else if (text.length < 6) {
//       return true;
//     } else {
//       return false;
//     }
//   };
//
//   const getConfirmationCodeErrorMessage = (text) => {
//     if (text.length === 0) {
//       return "Confirmation code is required!";
//     } else {
//       return "Confirmation code is invalid!";
//     }
//   };
//
//   const getPasswordErrorMessage = (text) => {
//     if (text.length === 0) {
//       return "Password is required!";
//     } else {
//       return "Password is invalid!";
//     }
//   };
//
//   //FOR ERROR MESSAGES*********************/END
//
//   return (
//     <Container backgroundColor={theme.colors.background}>
//       <Image
//         style={styles.logo}
//         resizeMode="contain"
//         source={
//           theme.dark
//             ? require("../../../assets/images/eurekall_whitelogo.png")
//             : require("../../../assets/images/eurekall_logo.png")
//         }
//       ></Image>
//       <Text
//         style={{
//           position: "absolute",
//           width: "100%",
//           height: 136,
//           top: 175,
//           left: "3%",
//           fontSize: 48,
//           fontFamily: "sans-serif-thin",
//           color: theme.colors.text,
//         }}
//       >
//         Reset your password here
//       </Text>
//       <TextInput
//         theme={{ roundness: 20 }}
//         mode="flat"
//         label="Confirmation code"
//         placeholder="e.g., 123456"
//         keyboardType="number-pad"
//         style={{
//           width: 336,
//           top: 300,
//           alignSelf: "center",
//           position: "absolute",
//         }}
//         value={confirmationCode}
//         onChangeText={setConfirmationCode}
//         returnKeyType="next"
//         onSubmitEditing={() => passwordTextInput.current.focus()}
//         left={
//           <TextInput.Icon
//             name="numeric"
//             color={confirmationCode ? theme.colors.primary : theme.colors.text}
//           />
//         }
//         error={
//           isHelperTextVisible || isSignInHelperTextVisible
//             ? isSignInHelperTextVisible ||
//               confirmationCodeHasErrors(confirmationCode)
//             : false
//         }
//       />
//       <HelperText
//         style={{
//           position: "absolute",
//           top: 360,
//         }}
//         type="error"
//         visible={
//           isHelperTextVisible
//             ? confirmationCodeHasErrors(confirmationCode)
//             : false
//         }
//       >
//         {getConfirmationCodeErrorMessage(confirmationCode)}
//       </HelperText>
//       <HelperText
//         style={{
//           position: "absolute",
//           top: 360,
//         }}
//         type="error"
//         visible={
//           isSignInHelperTextVisible &&
//           !confirmationCodeHasErrors(confirmationCode)
//             ? true
//             : false
//         }
//       >
//         Please enter the correct confirmation code!
//       </HelperText>
//       <TextInput
//         ref={passwordTextInput}
//         theme={{ roundness: 20 }}
//         mode="flat"
//         label="Password"
//         placeholder="Enter your new password"
//         style={{
//           width: 336,
//           top: 380,
//           alignSelf: "center",
//           position: "absolute",
//         }}
//         value={password}
//         onChangeText={setPassword}
//         left={
//           <TextInput.Icon
//             name="form-textbox-password"
//             color={password ? theme.colors.primary : theme.colors.text}
//           />
//         }
//         secureTextEntry={!isPasswordVisible}
//         autoCapitalize="none"
//         right={
//           <TextInput.Icon
//             name={isPasswordVisible ? "eye-off" : "eye"}
//             onPress={() => setIsPasswordVisible((state) => !state)}
//           />
//         }
//         error={isHelperTextVisible ? passwordHasErrors(password) : false}
//       />
//       <HelperText
//         style={{
//           position: "absolute",
//           top: 440,
//         }}
//         visible={hasText(password) ? !isHelperTextVisible : false}
//       >
//         Password requires at least 6 characters.
//       </HelperText>
//       <HelperText
//         style={{
//           position: "absolute",
//           top: 440,
//         }}
//         type="error"
//         visible={isHelperTextVisible ? passwordHasErrors(password) : false}
//       >
//         {getPasswordErrorMessage(password)}
//       </HelperText>
//       <View
//         style={{
//           position: "absolute",
//           top: 450,
//           paddingTop: 28,
//           alignSelf: "center",
//         }}
//       >
//         <CustomButton
//           title="Reset password"
//           bgColor={theme.colors.primary}
//           loading={loading}
//           width={343}
//           onPress={() => {
//             setIsHelperTextVisible(true);
//             resetPassword();
//           }}
//         ></CustomButton>
//       </View>
//       <View style={styles.touchableTextSection}>
//         <TouchableOpacity
//           onPress={() => {
//             navigate(LOGIN);
//           }}
//         >
//           <Text style={[styles.loginText, { color: theme.colors.primary }]}>
//             Return to login page
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </Container>
//   );
// }
//
// export default ResetPasswordComponent;
