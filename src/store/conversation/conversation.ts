import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IConversationsReduxState, Conversation } from "./conversation.types";

const initialState: IConversationsReduxState = {
    conversations: [],
    unreadConversations: []
}

export const conversationsReduxSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<Conversation[]>) => {
            console.log('conversations state updated');
            state.conversations = action.payload;
        },
        setUnreadConversations: (state, action: PayloadAction<Conversation["id"][]>) => {
            console.log('unreadConversations state updated');
            state.unreadConversations = action.payload;
        },
    }
})

export default conversationsReduxSlice.reducer