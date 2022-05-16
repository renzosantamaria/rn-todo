import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IConversationsReduxState, Conversation } from "./conversation.types";

const initialState: IConversationsReduxState = {
    conversations: []
}

export const conversationsReduxSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<Conversation[]>) => {
            console.log('conversations state updated');
            state.conversations = action.payload;
        },
    }
})

export default conversationsReduxSlice.reducer