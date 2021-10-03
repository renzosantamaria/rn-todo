import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { AppRegistry } from "react-native";
import * as API from '../API/index'

type User = {
    name: string;
    lastName: string;
    email: string;
    token: string
}

type IState = {
    user: User
}

const initialState = {
    user: {
        name: 'Default name',
        lastName: '',
        email: 'default@email.se',
        token: ''
    }
}

// Anpassa hela den här filen till en USER_SLICE 


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){

            state.user = {
                name: action.payload.name || 'No name',
                lastName: action.payload.lastName || 'no last name',
                email: action.payload.email || 'no lastname',
                token: action.payload.token || 'no token'
            }
        }
        // setTodoList(state, action: PayloadAction<Todo[]>){
        //     console.log(action);
            
        //     state.todoList = action.payload
        // },
        // addTodo(state, action: PayloadAction<string>){
        //     // will recieve the todo "text" as payload
        //     state.todoList = state.todoList.concat({
        //         id: Math.floor(Math.random() * 1000).toString(),
        //         text: action.payload,
        //         done: false,
        //     })
        // },
        // deleteTodo(state, action: PayloadAction<string>){
        //     //will recieve the item id as a payload
        //     state.todoList = state.todoList.filter((todo) => todo.id !== action.payload)
        // },
        // toggleTodoDone(state, action: PayloadAction<string>){
        //     //will recieve the item id as a payload
        //     const temp = [...state.todoList];

        //     let item = temp.find((todo) => todo.id == action.payload)!;
        //     item.done = !item.done;
        //     let todoIndex = temp.indexOf(item);
        //     temp[todoIndex] = item;

        //     state.todoList = temp
        // }
    },

})

export const userActions = userSlice.actions
export default userSlice.reducer