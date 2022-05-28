import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Conversation } from "./conversation.types";

const initialState = {
    conversationsList: <Conversation[]> []
}

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setConversationsList(state, action: PayloadAction<Conversation[]>){
            state.conversationsList = action.payload
        },
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

export const todoActions = conversationSlice.actions
export default conversationSlice.reducer