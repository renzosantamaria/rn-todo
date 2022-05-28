import React, { useEffect, useState } from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import Button from "../components/styled-components/Button";
import Screen from "../components/Screen/Screen";
import Input from "../components/Input";
import * as Colors from "../constants/colors";
// import * as API from "../API";
import { IReduxState } from "../store/store.types";
import userMethods from "../store/user/user.methods";
import userSelectors from "../store/user/user.selectors";
import { StackNavigationProp } from "@react-navigation/stack";
import { UnauthorizedNavigationStack } from "../navigation/Navigation.types";

const connectStateAndDispatch = connect(
  (state: IReduxState) => ({
    user: userSelectors.userStateSelector(state),
    isRegisterLoading: userSelectors.isRegisterInProgressSelector(state),
    registerComplete: userSelectors.registerUserStateSelector.isComplete(state),
    registerError: userSelectors.registerUserStateSelector.error(state)
  }),
  {
    registerUser: userMethods.registerUser
  }
);

interface IProps {
  showLogin: () => void;
  navigation: StackNavigationProp<UnauthorizedNavigationStack, "Landing">;
}

const RegisterForm: React.FC<ConnectedProps<typeof connectStateAndDispatch> & IProps> = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showLoading, setShowLoading] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const registerUser = () => {
    props.registerUser(name, lastname, email, password)
  };

  useEffect(() => {
    if (props.registerComplete) {
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Login", params: { } }],
      });
    }
  },[props.registerComplete])

  useEffect(() => {
    setShowErrorMsg(false)
  },[name, lastname, email, password ])


  useEffect(() => {
    if (props.isRegisterLoading) {
      setShowLoading(true);
    }
    if (props.registerError) {
      setShowLoading(false);
      setShowErrorMsg(true)
    }
  }, [props.isRegisterLoading, props.registerError]);

  return (
    <Screen
      bgcolor="black"
      header={{ hide: false, color: "#fff" }}
      transparentBackground={true}
      showLoadingIndicator={showLoading}
      loadingText="creating new user..."
      ignorepadding={true}
    >
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
        <View style={styles.registerForm}>
          <Text style={styles.heading}>Register </Text>
          <Input
            style={"inputLight"}
            placeholder={"Name"}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            style={"inputLight"}
            placeholder={"LastName"}
            value={lastname}
            onChangeText={(text) => setLastname(text)}
          />
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
          <Text style={styles.errorMessage}>Something happened, please try again </Text>
          }

          <Button
            width={"60%"}
            bgColor={Colors.accentColor}
            color={"#fff"}
            onPress={registerUser}
            text={"REGISTER"}
          />
          {/* <Text onPress={props.showLogin} style={styles.registerText}>
            Cancel
          </Text> */}
        </View>
      </KeyboardAvoidingView>
      
    </Screen>
  );
};

const styles = StyleSheet.create({
  registerForm: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "black",
    fontSize: 30,
  },
  registerButton: {
    width: "60%",
  },
  registerText: {
    color: "#000000",
    textAlign: "right",
    width: "60%",
  },
  errorMessage:{
    fontSize: 12,
    color: "red",
  }
});

export default connectStateAndDispatch(RegisterForm);
