import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import Button from "../styled-components/Button";
import Input from "../Input";
import { userActions } from "../../store/user-slice";
import * as Colors from "../../constants/colors";
import * as API from "../../API";

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
    <View style={styles.registerForm}>
      <Text style={styles.heading}>Register </Text>
      <Input
        style={"inputLight"}
        placeholder={"name"}
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
      <Text onPress={props.showLogin} style={styles.registerText}>
        Cancel
      </Text>
    </View>
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
    color: "white",
    fontSize: 30,
  },
  registerButton: {
    width: "60%",
  },
  registerText: {
    color: "#fff",
    textAlign: "right",
    width: "60%",
  },
});

export default RegisterForm;
