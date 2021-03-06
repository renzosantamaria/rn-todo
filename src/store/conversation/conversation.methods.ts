import * as API from "../../API/index"
import { addRequestState } from "../requestState";
import { AppThunk } from "../store.types";
import { conversationsReduxSlice } from "./conversation";

const getConversations = (): AppThunk => async (dispatch) => {
    try {

        dispatch(
            addRequestState({
                name: "getConversations",
                state: "LOADING"
            })
        )
        const response = await API.fetchUserConversations()
        
        if (!response) {
            throw new Error("Failed to fetch data");
        }
        
        dispatch(conversationsReduxSlice.actions.setConversations(response))

        dispatch(
            addRequestState({
                name: "postTodo",
                state: "COMPLETE"
            })
        )
        
    } catch (error) {
        console.log(error);
        
        dispatch(
            addRequestState({
                name: "postTodo",
                error : {
                    message: error.message,
                    exception: error
                }
            })
        )
    }
}

const createConversation = (membersId: string, name: string): AppThunk => async (dispatch) => {
    try {
        if (!membersId || !name) {
            throw new Error("Missing conversation arguments");
        }

        dispatch(
            addRequestState({
                name: "createConversation",
                state: "LOADING"
            })
        )
        const response = await API.createConversation(membersId, name)
        
        if (!response) {
            throw new Error("Failed to create a conversation");
        }
        
        console.log(response);
        if (response) {
            let res = await API.fetchUserConversations()
            if (res) {
                dispatch(conversationsReduxSlice.actions.setConversations(res))
            }
        }
        
        dispatch(
            addRequestState({
                name: "createConversation",
                state: "COMPLETE"
            })
        )
        
    } catch (error) {
        console.log(error);
        
        dispatch(
            addRequestState({
                name: "createConversation",
                state: "ERROR"
            })
        )
    }
}

const setUnreadConversations = (unreadConversations: number[]): AppThunk => async (dispatch) => {
    dispatch(conversationsReduxSlice.actions.setUnreadConversations(unreadConversations))
}

const setOpenConversationId = (chatId: number | null): AppThunk => async (dispatch) => {
    dispatch(conversationsReduxSlice.actions.setOpenConversationId(chatId))
}

export default {
    getConversations,
    createConversation,
    setUnreadConversations,
    setOpenConversationId
}