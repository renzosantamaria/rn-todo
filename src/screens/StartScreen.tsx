import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  // SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";

import Screen from "../components/Screen/Screen";

import { connect, ConnectedProps } from "react-redux";
import { IReduxState } from "../store/store.types";
import userSelectors from "../store/user/user.selectors";

import Input from "../components/Input";
import Button from "../components/styled-components/Button";
import Image from "../components/styled-components/Image";
import { SafeAreaView } from "../components/styled-components/wrapper";
import IconButton from "../components/styled-components/IconButton";
import * as Colors from "../constants/colors";
import authMethods from "../store/auth/auth.methods";
import todoSelectors from "../store/todo/todo.selectors";
import todoMethods from "../store/todo/todo.methods";
import { io } from "socket.io-client";
import conversationMethods from "../store/conversation/conversation.methods";

const connectStateAndDispatch = connect(
  (state: IReduxState) => ({
    user: userSelectors.userStateSelector(state),
    todos: todoSelectors.todosStateSelector(state)
  }),
  {
    getConversations: conversationMethods.getConversations,
    logout: authMethods.logout,
    getAllTodos: todoMethods.getAllTodos,
    postTodo: todoMethods.postTodo,
    deleteTodoById: todoMethods.deleteTodoById,
    toggleTodoState: todoMethods.toggleTodoStateById
  }
);

const Todos: React.FC<ConnectedProps<typeof connectStateAndDispatch>> = (
  props
) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [todoListFilter, settodoListFilter] = useState<string>("all");
  const socketRef = useRef()
  console.log('perron');
  
  useEffect(() => {
    socketRef.current = io('http://192.168.0.40:5001') // dev
    socketRef.current.on('conversationCreated', (msg) => {
      console.log('getting prop conversationCreated!!!!');
      props.getConversations();
    }) 
    socketRef.current.on('messageCreated', (msg) => {
      console.log('index messageCreated --------------- :)');
      props.getConversations();
    })
    return () => {
    socketRef.current.disconnect()
    }
  }, [props.conversations])

  const addTodoHandler = async () => {
    await props.postTodo(inputValue, props.user.userId!)
    setInputValue("");
  };

  const deleteTodoHandler = async (id: number) => {
    await props.deleteTodoById(id)
  };

  const handleDoneToggle = async (id: number) => {
    await props.toggleTodoState(id);
  };

  useEffect(() => {
    props.getAllTodos();
  }, []);

  const returnFilteredList = () => {
    switch (todoListFilter) {
      case "all":
        return props.todos;
        break;

      case "done":
        return props.todos.filter((todo) => todo.done == true);
        break;

      case "incomplete":
        return props.todos.filter((todo) => todo.done == false);
        break;

      default:
        break;
    }
  };

  return (
    <Screen
      bgcolor="black"
      header={{ hide: true, color: "primary" }}
      transparentBackground={true}
      // showLoadingIndicator={props.isLoginGoogleLoading}
      // loadingText="Logging in..."
      ignorepadding={true}
    >
      <SafeAreaView>
        <StatusBar hidden={false} backgroundColor={"black"} />
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Text style={styles.welcome}> Welcome, {props.user.name} </Text>
          <Image imageSource={require("../assets/dog.jpeg")} />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            style={"inputLight"}
            placeholder={"placeholder..."}
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
            onSubmitEditing={addTodoHandler}
            onKeyPress={({ nativeEvent }) => console.log(nativeEvent.key)}
          />
          <Text
            onPress={addTodoHandler}
            style={{ color: "#29728c", fontSize: 18 }}
          >
            Add Todo
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: 18,
          }}
        >
          <Button
            width={"auto"}
            bgColor={Colors.$4dp}
            color={"#fff"}
            onPress={() => {
              settodoListFilter("done");
            }}
            text={"Show Done"}
          />
          <Button
            width={"auto"}
            bgColor={Colors.$4dp}
            color={"#fff"}
            onPress={() => {
              settodoListFilter("incomplete");
            }}
            text={"Show Incomplete"}
          />
          <Button
            width={"auto"}
            bgColor={Colors.$4dp}
            color={"#fff"}
            onPress={() => {
              settodoListFilter("all");
            }}
            text={"Show all"}
          />
        </View>

        <FlatList
          style={ styles.flatlist}
          // keyExtractor={(todo) => todo.userId}
          data={returnFilteredList()}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.todoItemWrapper,
                backgroundColor: `${item.done ? "#222" : "#222"}`,
              }}
            >
              <Text
                style={{
                  color: item.done ? "#8f8f8f" : "#fff",
                  textDecorationLine: item.done ? "line-through" : "none",
                }}
              >
                {item.text}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  color={`${item.done ? "#48914e" : "#e1e1e1"}`}
                  name={
                    item.done
                      ? "checkbox-marked-circle-outline"
                      : "checkbox-blank-circle-outline"
                  }
                  onPress={() => handleDoneToggle(item.id)}
                />
                <IconButton
                  color={"#f28080"}
                  name={"delete"}
                  onPress={() => deleteTodoHandler(item.id)}
                />
              </View>
            </View>
          )} 
        />
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  flatlist:{
    marginTop: 20,
    marginBottom: 40,
    width: "100%",
    marginHorizontal: "auto"
  },
  todoItemWrapper: {
    color: "black",
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 12,
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  welcome: {
    fontSize: 30,
    color: Colors.background,
    marginVertical: 20,
  },
});

export default connectStateAndDispatch(Todos);
