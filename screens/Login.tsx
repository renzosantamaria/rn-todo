import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import LoginForm from "../components/UI/LoginForm";
import RegisterForm from "../components/UI/RegisterForm";

import * as Colors from "../constants/colors";

const LoginScreen: React.FC = () => {
    const [showLoginForm, setShowLoginForm] = useState<boolean>(true)

    const toggleLoginRegister = () => {
        setShowLoginForm( prev => !prev)
    }
  return (
    <SafeAreaView style={styles.container}>
        {showLoginForm ?
            <LoginForm showRegister={toggleLoginRegister} />
            :
            <RegisterForm showLogin={toggleLoginRegister} />
        }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default LoginScreen;
