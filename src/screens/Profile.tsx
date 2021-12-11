import React from "react";
import {
  Text,
  SafeAreaView,
} from "react-native";

import { connect, ConnectedProps } from "react-redux";
import { IReduxState } from "../store/store.types";
import userSelectors from "../store/user/user.selectors";

import Button from "../components/styled-components/Button";
import * as Colors from "../constants/colors";
import authMethods from "../store/auth/auth.methods";
import todoSelectors from "../store/todo/todo.selectors";
import todoMethods from "../store/todo/todo.methods";

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


const ProfileScreen:React.FC<ConnectedProps<typeof connectStateAndDispatch>> = (
    props
  ) => {

    const handleLogout = () => {
        props.logout();
    };
    return(
        <SafeAreaView>
            <Text>Hello from the profile Screen</Text>
            <Button
                width={"auto"}
                bgColor={Colors.$4dp}
                color={"#dc5151"}
                onPress={handleLogout}
                text={"Logout"}
            />
        </SafeAreaView>
    )
}

export default connectStateAndDispatch(ProfileScreen)