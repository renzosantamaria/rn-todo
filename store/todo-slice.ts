import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { AppRegistry } from "react-native";
import * as API from '../API/index'

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

// export const fetchTodos = createAsyncThunk<Todo[]>('todo/fetchAllTodos',
//     async () => {
        
//         const response = fetch('http://192.168.0.43:5000/api/v1/todos')
//         console.log(response);
//         const data: any = await (await response).json
//         console.log(response)
//         return data
//         // const response = await API.fetchAllTodos()
//         // return response.data
//     }
// )

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodoList(state, action: PayloadAction<Todo[]>){
            console.log(action);
            
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
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchTodos.pending, (state) => {
    //         state.status = 'loading'
    //         state.error = null
    //     });

    //     builder.addCase(fetchTodos.fulfilled,
    //         (state, {payload}) => {
    //             console.log(payload)
    //             // state.todoList.push(...payload)
    //             // state.status = 'idle'
    //     });

    //     builder.addCase(fetchTodos.rejected,
    //         (state, {payload}) => {
    //             console.log(payload)
    //             // if (payload) state.error = payload.message;
    //             // state.status = 'idle'
    //         })
        
    // }
})

export const todoActions = todoSlice.actions
export default todoSlice.reducer