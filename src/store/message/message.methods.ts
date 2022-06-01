import * as API from "../../API/index"
import { addRequestState } from "../requestState";
import { AppThunk } from "../store.types";
import { conversationsReduxSlice } from "../conversation/conversation";

const postMessage = (chatId: number, content: string): AppThunk => async (dispatch) => {
    try {
        if (!chatId || !content) {
            throw new Error("Invalid message");
        }

        dispatch(
            addRequestState({
                name: "postMessage",
                state: "LOADING"
            })
        )
        const response = await API.createMessage(chatId, content)
        
        if (!response) {
            throw new Error("Failed to post data");
        }
        
        //fetch the conversation or just the messages by conversation ID
        console.log(response);
        if (response) {
            
            let res = await API.fetchUserConversations()
            if (res) {
                dispatch(conversationsReduxSlice.actions.setConversations(res))
            }
        }
        
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
                state: "ERROR",
                error : {
                    message: error.message,
                    exception: error
                }
            })
        )
    }
}


export default {
    postMessage
}