import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import LoginForm from "../components/UI/LoginForm";
import RegisterForm from "../components/UI/RegisterForm";

import { RouteProp } from "@react-navigation/native";
import { UnauthorizedNavigationStack } from "../navigation/Navigation.types";
import { StackNavigationProp } from "@react-navigation/stack";

import Button from "../components/styled-components/Button";
import * as Colors from "../constants/colors";


interface Props {
  route: RouteProp<UnauthorizedNavigationStack, "Landing">;
  navigation: StackNavigationProp<UnauthorizedNavigationStack, "Landing">;
}

const LandingScreen: React.FC<Props> = (props) => {
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);

  const navigateToLogin = () => {
    props.navigation.navigate("Login")
  }

  const navigateToRegister = () => {
    props.navigation.navigate("Register")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        width={"60%"}
        bgColor={Colors.accentColor}
        color={"#fff"}
        onPress={navigateToLogin}
        text={"LOGIN"}
      />
      <Button
        width={"60%"}
        bgColor={Colors.accentColor}
        color={"#fff"}
        onPress={navigateToRegister}
        text={"CREATE AN ACCOUNT"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LandingScreen;
