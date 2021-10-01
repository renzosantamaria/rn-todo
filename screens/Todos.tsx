import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  todoActions,
  // fetchTodos
}
  from "../store/todo-slice";
  import { fetchAllTodos, createTodo, deleteTodoById, toggleDoneState } from "../API";

import Input from "../components/Input";
import Button from "../components/styled-components/Button";
import Image from "../components/styled-components/Image";
import IconButton from "../components/styled-components/IconButton";
import * as Colors from "../constants/colors";


const Todos: React.FC = () => {
  const dispatch = useDispatch()

  // kolla vilken typ man kan använda istället för any
  const todoList:any = useSelector<RootState>(state => state.todo.todoList) 

  const [inputValue, setInputValue] = useState<string>("");
  const [todoListFilter, settodoListFilter] = useState<string>("all");

  const addTodoHandler = async () => {
    // dispatch(todoActions.addTodo(inputValue))
    
    const response = await createTodo(inputValue, 2)
    console.log(response);
    
    setInputValue("");
    fetchTodos()

  };

  const deleteTodoHandler = async (id: number) => {
    // dispatch(todoActions.deleteTodo(id))
    const response = await deleteTodoById(id)
    fetchTodos()
  };

  const handleDoneToggle = async (id: number) => {
    // dispatch(todoActions.toggleTodoDone(id))
    const response = await toggleDoneState(id)
    fetchTodos()
  };

  const fetchTodos = async () => {
    // console.log('triggering in Todos by button ');
    
    // // dispatch(fetchTodos())

    // const response = await fetch('http://192.168.0.43:5000/api/v1/todos')
    // const data = await response
    // console.log(data);
    const response = await fetchAllTodos()
    dispatch(todoActions.setTodoList(response))
    
  }

  useEffect( () => {
    fetchTodos()

  }, [])

  const returnFilteredList = () => {
    switch (todoListFilter) {
      case "all":
        return todoList;
        break;

      case "done":
        return todoList.filter((todo) => todo.done == true);
        break;

      case "incomplete":
        return todoList.filter((todo) => todo.done == false);
        break;

      default:
        break;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor={"black"} />
      <View style={{marginTop:30}}>
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
          bgColor={Colors.$4dp}
          color={"#fff"}
          onPress={() => {
            settodoListFilter("done");
          }}
          text={"Show Done"}
        />
        <Button
          bgColor={Colors.$4dp}
          color={"#fff"}
          onPress={() => {
            settodoListFilter("incomplete");
          }}
          text={"Show Incomplete"}
        />
        <Button
          bgColor={Colors.$4dp}
          color={"#fff"}
          onPress={() => {
            settodoListFilter("all");
          }}
          text={"Show all"}
        />
      </View>

      <FlatList
        style={{ marginTop: 20, width: "100%", marginHorizontal: "auto" }}
        keyExtractor={(todo) => todo.id}
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    color: "white",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  todoItemWrapper: {
    color: "black",
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 12,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

export default Todos;
