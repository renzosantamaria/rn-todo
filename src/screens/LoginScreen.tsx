import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import Button from "../components/styled-components/Button";
import Input from "../components/Input";
import * as Colors from "../constants/colors";
import { IReduxState } from "../store/store.types";
import authStateSelector from "../store/auth/auth.selectors";
import authMethods from "../store/auth/auth.methods";
import Screen from "../components/Screen/Screen";

const connectStateAndDispatch = connect(
  (state: IReduxState) => ({
    isAuth: authStateSelector.authStateSelector(state),
    isLoginLoading: authStateSelector.isLoginInProgressSelector(state),
    loginError: authStateSelector.loginCredentialsStateSelector.error(state)
  }),
  {
    loginUser: authMethods.login,
  }
);

interface IProps {
  showRegister: () => void;
}

const LoginForm: React.FC<
  ConnectedProps<typeof connectStateAndDispatch> & IProps
> = (props) => {
  const [email, setEmail] = useState<string>("renzo.santamaria@outlook.com");
  const [password, setPassword] = useState<string>("password");
  const [showLoading, setShowLoading] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleLogin = async () => {
    props.loginUser({ email, password });
  };

  useEffect(() => {
    setShowErrorMsg(false)
  },[email, password ])

  useEffect(() => {
    if (props.isLoginLoading) {
      setShowLoading(true);
    }
    if (props.loginError) {
      setShowLoading(false);
      setShowErrorMsg(true)
    }
  }, [props.isLoginLoading, props.loginError]);

  const viewContent = <View style={styles.loginForm}>
  <Text style={styles.heading}>Login </Text>
  <Input
    style={"inputLight"}
    placeholder={"Email"}
    value={email}
    onChangeText={(text) => setEmail(text)}
  />
  <Input
    style={"inputLight"}
    placeholder={"Password"}
    value={password}
    onChangeText={(text) => setPassword(text)}
  />
  {showErrorMsg &&
  <Text style={styles.errorMessage}>The given email or password doesn't exist or match </Text>
  }
  <Button
    width={"60%"}
    bgColor={Colors.accentColor}
    color={"#fff"}
    onPress={handleLogin}
    text={"LOGIN"}
  />
</View>

  return (
    <Screen
      bgcolor="black"
      header={{ hide: false, color: "#fff" }}
      transparentBackground={true}
      // showLoadingIndicator={props.isLoginGoogleLoading}
      showLoadingIndicator={showLoading}
      loadingText="Logging in..."
      ignorepadding={true}
    >
      {Platform.OS === 'ios' ?
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
          {viewContent}
        </KeyboardAvoidingView>
        :
        <>
          {viewContent}
        </>
      }
    </Screen>
  );
};

const styles = StyleSheet.create({
  loginForm: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "black",
    fontSize: 30,
  },
  loginButton: {
    width: "60%",
  },
  errorMessage:{
    fontSize: 12,
    color: "red",
  }
});

export default connectStateAndDispatch(LoginForm);
