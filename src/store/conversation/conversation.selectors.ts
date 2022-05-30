import { IReduxState } from "../store.types";
import { createSelector } from "@reduxjs/toolkit";

import { generateRequestStateSelectors } from "../requestState";

const conversationsStateSelector = createSelector(
    (state:IReduxState) => state.conversations,
    (conversationState) => conversationState.conversations
)

const unreadConversationStateSelector = createSelector(
    (state:IReduxState) => state.conversations,
    (unreadConversationState) => unreadConversationState.unreadConversations
)

const openConversationStateSelector = createSelector(
    (state:IReduxState) => state.conversations,
    (openConversationState) => openConversationState.openConversationId
)

export default {
    conversationsStateSelector,
    unreadConversationStateSelector,
    openConversationStateSelector
}