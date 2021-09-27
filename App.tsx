import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import Input from "./components/Input";
import Button from "./components/styled-components/Button";
import Image from "./components/styled-components/Image"
import IconButton from "./components/styled-components/IconButton"

type Todo = {
  id: string;
  text: string;
  done: boolean;
};


const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([
    { id: "123d", text: "Kissa i skogen", done: true },
    { id: "123", text: "Gå på en promenad", done: false },
    { id: "123sdfs", text: "Leka med bollen", done: false },
    { id: "12s3sdfs", text: "Sova på soffan", done: true },
    { id: "12s3sdfsddd", text: "Fixa mina ögonbryn", done: true },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [todoListFilter, settodoListFilter] = useState<string>("all");


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

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor={"black"} />

      <Image imageSource={require('./assets/dog.jpeg')}/>
      
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
        <Input
          style={"inputLight"}
          placeholder={"placeholder..."}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          onSubmitEditing={addTodoHandler}
          onKeyPress={({ nativeEvent }) => console.log(nativeEvent.key)}
        />

        <Button
          bgColor={"#f8dfa0"}
          color={"black"}
          onSubmitEditing={addTodoHandler}
          onPress={addTodoHandler}
          text={"Add Todo!!"}
        />
      </View>
      <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 10}}>
        <Button
          bgColor={"#898989"}
          color={"#111"}
          onPress={() => {settodoListFilter('done')}}
          text={"Show Done"}
        />
        <Button
          bgColor={"#898989"}
          color={"#111"}
          onPress={() => {settodoListFilter('incomplete')}}
          text={"Show Incomplete"}
        />
        <Button
          bgColor={"#898989"}
          color={"#111"}
          onPress={() => {settodoListFilter('all')}}
          text={"Show all"}
        />
      </View>
      

      <FlatList
        style={{ marginTop: 20, width: "100%", marginHorizontal: "auto" }}
        keyExtractor={(todo) => todo.id}
        data={ returnFilteredList()}
        renderItem={({ item }) => (
          <View style={{...styles.todoItemWrapper, backgroundColor: `${item.done ? 'white': 'white'}`} }>
            <Text> {item.text} </Text>
            <View style={{flexDirection: 'row'}}>
              {/* <Text onPress={()=> hangleToggle(item.id)} style={{color: 'blue'}}>Toggle</Text> */}
              <IconButton color={"#0a89b8"} name={item.done ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'} onPress={() => hangleToggle(item.id)} />
              <IconButton color={"#c44d4d"} name={'delete'} onPress={() => deleteTodoHandler(item.id)} />
            </View>
          
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    color: "white",
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
