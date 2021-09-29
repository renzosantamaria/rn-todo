import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo-slice";

const store = configureStore({
    reducer: {
        todo: todoSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store