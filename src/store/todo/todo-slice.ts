import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { AppRegistry } from "react-native";
// import * as API from '../API/index'

type Todo = {
    id: string;
    text: string;
    done: boolean;
}

type IState = {
    todoList: Todo;
    status: 'loading' | 'idle';
    error: string | null
}

const initialState = {
    todoList: <Todo[]> [
        { id: "123d", text: "Pee in the forest", done: false },
        { id: "123", text: "Take a walk", done: true },
        { id: "123sdfs", text: "Play with the ball", done: false },
        { id: "12s3sdfs", text: "Take a nap on the couch", done: true },
        { id: "12s3sdfsddd", text: "Fix my eyebrowns", done: true },
    ],
    status: 'idle',
    error: null
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodoList(state, action: PayloadAction<Todo[]>){
            state.todoList = action.payload
        },
        addTodo(state, action: PayloadAction<string>){
            // will recieve the todo "text" as payload
            state.todoList = state.todoList.concat({
                id: Math.floor(Math.random() * 1000).toString(),
                text: action.payload,
                done: false,
            })
        },
        deleteTodo(state, action: PayloadAction<string>){
            //will recieve the item id as a payload
            state.todoList = state.todoList.filter((todo) => todo.id !== action.payload)
        },
        toggleTodoDone(state, action: PayloadAction<string>){
            //will recieve the item id as a payload
            const temp = [...state.todoList];

            let item = temp.find((todo) => todo.id == action.payload)!;
            item.done = !item.done;
            let todoIndex = temp.indexOf(item);
            temp[todoIndex] = item;

            state.todoList = temp
        }
    }
})

export const todoActions = todoSlice.actions
export default todoSlice.reducer