import React from "react";
import {
  Text,
  SafeAreaView,
  View,
} from "react-native";

import { connect, ConnectedProps } from "react-redux";
import { IReduxState } from "../store/store.types";
import userSelectors from "../store/user/user.selectors";

import Button from "../components/styled-components/Button";
import * as Colors from "../constants/colors";
import authMethods from "../store/auth/auth.methods";
import todoSelectors from "../store/todo/todo.selectors";
import todoMethods from "../store/todo/todo.methods";

import { RouteProp } from "@react-navigation/native";
import { AuthorizedNavigationStack } from "../navigation/Navigation.types";
import { StackNavigationProp } from "@react-navigation/stack";

const connectStateAndDispatch = connect(
    (state: IReduxState) => ({
      user: userSelectors.userStateSelector(state),
      todos: todoSelectors.todosStateSelector(state)
    }),
    {
      logout: authMethods.logout,
      getAllTodos: todoMethods.getAllTodos,
    }
  );

interface Props {
  route: RouteProp<AuthorizedNavigationStack, "Password">;
  navigation: StackNavigationProp<AuthorizedNavigationStack, "Password">;
}

const ProfileScreen:React.FC<ConnectedProps<typeof connectStateAndDispatch> & Props> = (
    props
  ) => {

    const handleLogout = () => {
      props.logout();
    };

    const navigateToChangePassword = () => {
      props.navigation.navigate("Password")
    }

    return(
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View 
            style={{
              paddingHorizontal: 20
            }}
          >
            <Button
                width={"auto"}
                bgColor={Colors.$4dp}
                color={"#5a78c6"}
                onPress={navigateToChangePassword}
                text={"CHANGE PASSWORD"}
            />
            <Button
                width={"auto"}
                bgColor={Colors.$4dp}
                color={"#dc5151"}
                onPress={handleLogout}
                text={"LOG OUT"}
            />
          </View>
        </SafeAreaView>
    )
}

export default connectStateAndDispatch(ProfileScreen)