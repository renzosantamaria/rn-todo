import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IMessagesReduxState, Message } from "./message.types";

const initialState: IMessagesReduxState = {
    messages: []
}

export const messagesReduxSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
    }
})

export default messagesReduxSlice.reducer