import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthReduxState } from "./auth.types";

const initialState: IAuthReduxState = {
    authState: "INITIAL",
    userId: undefined
}

export const authReduxSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<number>) => {
            state.authState = "LOGGED_IN";
            state.userId = action.payload;
        },
        logoutSuccess: (state) => {
            state.authState = "LOGGED_OUT";
            state.userId = undefined
        }
    }
})

export default authReduxSlice.reducer