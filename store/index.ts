import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo-slice";
import userSlice from "./user-slice";
// import { applyMiddleware } from "redux";
// import ReduxThunk from 'redux-thunk'

const store = configureStore({
    reducer: {
        todo: todoSlice,
        user: userSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['todo/fetchAllTodos/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export default store