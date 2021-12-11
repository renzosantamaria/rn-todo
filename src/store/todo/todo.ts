import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITodosReduxState, Todo } from "./todo.types";

const initialState: ITodosReduxState = {
    todos: []
}

export const todosReduxSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
    }
})

export default todosReduxSlice.reducer