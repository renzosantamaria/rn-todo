import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IConversationsReduxState, Conversation } from "./conversation.types";

const initialState: IConversationsReduxState = {
    conversations: [],
    unreadConversations: [],
    openConversationId: null
}

export const conversationsReduxSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setConversations: (state, action: PayloadAction<Conversation[]>) => {
            state.conversations = action.payload;
        },
        setUnreadConversations: (state, action: PayloadAction<Conversation["id"][]>) => {
            state.unreadConversations = action.payload;
        },
        setOpenConversationId:(state, action: PayloadAction<number | null>) => {
            state.openConversationId = action.payload;
        },
    }
})

export default conversationsReduxSlice.reducer