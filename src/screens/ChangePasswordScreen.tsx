import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import Button from "../components/styled-components/Button";
import Input from "../components/Input";
import * as Colors from "../constants/colors";
import { IReduxState } from "../store/store.types";
import userMethods from "../store/user/user.methods";
import Screen from "../components/Screen/Screen";
import { changeUserPassword } from "../API";

// import { RouteProp } from "@react-navigation/native";
import { AuthorizedNavigationStack } from "../navigation/Navigation.types";
import { StackNavigationProp } from "@react-navigation/stack";

const connectStateAndDispatch = connect(
  (state: IReduxState) => ({}),
  {
    changePassword: userMethods.changeUserPassword,
  }
);

interface IProps {
  showRegister: () => void;
  navigation: StackNavigationProp<AuthorizedNavigationStack, "Home">;
}

const ChangePasswordForm: React.FC<
  ConnectedProps<typeof connectStateAndDispatch> & IProps
> = (props) => {
    
  const [newPassword, setNewPassword] = useState<string>("newpassword");

  const handleChangePassword= async () => {
    const response = await changeUserPassword(newPassword)
    if (!response) {
        console.log(" Unable to change the password");
    }else if (response) {
        console.log('password updated successfully!');
        props.navigation.goBack()
    }
  }

  return (
    <Screen
      bgcolor="black"
      header={{
        hide: false,
        color: "#fff",
        backButtonText:"Profile"
      }}
      transparentBackground={true}
      
      // showLoadingIndicator={props.isLoginGoogleLoading}
      // loadingText="Logging in..."
      ignorepadding={true}
    >
      <View style={styles.loginForm}>
        <Text style={styles.heading}>Change Password </Text>
        <Input
          style={"inputLight"}
          placeholder={"Email"}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <Button
          width={"60%"}
          bgColor={Colors.accentColor}
          color={"#fff"}
          onPress={handleChangePassword}
          text={"ACCEPT"}
        />
      </View>
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
});

export default connectStateAndDispatch(ChangePasswordForm);
