import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import Button from "../components/styled-components/Button";
import Screen from "../components/Screen/Screen";
import Input from "../components/Input";
import * as Colors from "../constants/colors";
import * as API from "../API";

interface IProps {
  showLogin: () => void;
}

const RegisterForm: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = async () => {
    const response = await API.registerUser(name, lastname, email, password);
    if (!response) {
      console.log(" Unable to register this user");
    }
  };

  return (
    <Screen
      bgcolor="black"
      header={{ hide: false, color: "#fff" }}
      transparentBackground={true}
      // showLoadingIndicator={props.isLoginGoogleLoading}
      // loadingText="Logging in..."
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
});

export default RegisterForm;
