import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
} from "react-native";
import Input from "./components/Input";
import Button from "./components/styled-components/Button";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

// interface Fn {
//   Todo => void
// }


const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([
    { id: "123d", text: "Hej Korre", done: true },
    { id: "123", text: "Hej Sara", done: false },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  // const [showDoneTodos, setShowDoneTodos] = useState(false)
  const [todoListFilter, settodoListFilter] = useState<string>("incomplete");


  const returnFilteredList = () => {
    switch (todoListFilter) {
      case 'all':
        return todoList
        break;
    
      case 'done':
        return todoList.filter( todo => todo.done == true)
        break;
    
      case 'incomplete':
        return todoList.filter( todo => todo.done == false)
        break;
    
      default:
        break;
    }
    // return data
  }

  const addTodoHandler = () => {
    setTodoList((prev) =>
      prev.concat({
        id: Math.floor(Math.random() * 1000).toString(),
        text: inputValue,
        done: false
      })
    );
    setInputValue("");
  };

  const deleteTodoHandler = (id: string) => {
    setTodoList((prev) => [...prev].filter((todo) => todo.id !== id));
  };

  const hangleToggle = (id:string) => {
    const temp = [...todoList]

    let item = temp.find( todo => todo.id == id )!
    item.done = !item.done
    let todoIndex = temp.indexOf(item)
    temp[todoIndex] = item

    setTodoList(temp)
    // console.log(temp)

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor={"green"} />

      <Input
        style={"inputLight"}
        placeholder={"placeholder..."}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        onSubmitEditing={addTodoHandler}
        onKeyPress={({ nativeEvent }) => console.log(nativeEvent.key)}
      />

      <Button
        bgColor={"white"}
        color={"black"}
        onSubmitEditing={addTodoHandler}
        onPress={addTodoHandler}
        text={"Add Todo!!"}
      />

      <Button
        bgColor={"peachpuff"}
        color={"black"}
        onPress={() => {settodoListFilter('done')}}
        text={"Show Done"}
      />
      <Button
        bgColor={"peachpuff"}
        color={"black"}
        onPress={() => {settodoListFilter('incomplete')}}
        text={"Show Incomplete"}
      />
      <Button
        bgColor={"peachpuff"}
        color={"black"}
        onPress={() => {settodoListFilter('all')}}
        text={"Show all"}
      />

      <FlatList
        style={{ marginTop: 20, width: "100%", marginHorizontal: "auto" }}
        keyExtractor={(todo) => todo.id}
        data={ returnFilteredList()}
        renderItem={({ item }) => (
          <View style={{...styles.todoItemWrapper, backgroundColor: `${item.done ? 'white': 'grey'}`} }>
            <Text> {item.text} </Text>
            <Text onPress={()=> hangleToggle(item.id)} style={{color: 'blue'}}>Toggle</Text>
            <Text
              style={styles.delete}
              onPress={() => deleteTodoHandler(item.id)}
            >
              Delete
            </Text>
          </View>
        )}
      />
      {/* </Styles.Wrapper> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    color: "white",
    // flex: 1,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  button: {
    backgroundColor: "white",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  input: {
    backgroundColor: "white",
    width: "60%",
    padding: 6,
    borderRadius: 50,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    marginVertical: 20,
  },
  todoItemWrapper: {
    backgroundColor: "white",
    color: "black",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 12,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  delete: {
    color: "red",
  },
});

export default App;
