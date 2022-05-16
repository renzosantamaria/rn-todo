import * as API from "../../API/index"
import { addRequestState } from "../requestState";
import { AppThunk } from "../store.types";
import { sortArrayByObjKey } from "../../utils/global.functions";
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
            console.log('sending fetch user conversations');
            
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
                state: "ERROR"
            })
        )
    }
}
const deleteTodoById = (todoId: number): AppThunk => async (dispatch) => {
    // try {
    //     if (!todoId ) {
    //         throw new Error("Missing todo ID");
    //     }

    //     dispatch(
    //         addRequestState({
    //             name: "deleteTodoById",
    //             state: "LOADING"
    //         })
    //     )
    //     const response = await API.deleteTodoById(todoId)
    //     if (!response) {
    //         throw new Error("Failed delete todo");
    //     }
        
    //     dispatch(getAllTodos())

    //     dispatch(
    //         addRequestState({
    //             name: "deleteTodoById",
    //             state: "COMPLETE"
    //         })
    //     )
        
    // } catch (error) {
    //     console.log(error);
        
    //     dispatch(
    //         addRequestState({
    //             name: "deleteTodoById",
    //             state: "ERROR"
    //         })
    //     )
    // }
}
const toggleTodoStateById = (todoId: number): AppThunk => async (dispatch) => {
    // try {
    //     if (!todoId ) {
    //         throw new Error("Missing todo ID");
    //     }

    //     dispatch(
    //         addRequestState({
    //             name: "toggleTodoById",
    //             state: "LOADING"
    //         })
    //     )
    //     const response = await API.toggleTodoDoneState(todoId)
    //     if (!response) {
    //         throw new Error("Failed delete todo");
    //     }
        
    //     dispatch(getAllTodos())

    //     dispatch(
    //         addRequestState({
    //             name: "toggleTodoById",
    //             state: "COMPLETE"
    //         })
    //     )
        
    // } catch (error) {
    //     console.log(error);
        
    //     dispatch(
    //         addRequestState({
    //             name: "toggleTodoById",
    //             state: "ERROR"
    //         })
    //     )
    // }
}
const getMessagesByConversationId = (todoId: number): AppThunk => async (dispatch) => {
    // try {
    //     if (!todoId ) {
    //         throw new Error("Missing todo ID");
    //     }

    //     dispatch(
    //         addRequestState({
    //             name: "toggleTodoById",
    //             state: "LOADING"
    //         })
    //     )
    //     const response = await API.toggleTodoDoneState(todoId)
    //     if (!response) {
    //         throw new Error("Failed delete todo");
    //     }
        
    //     dispatch(getAllTodos())

    //     dispatch(
    //         addRequestState({
    //             name: "toggleTodoById",
    //             state: "COMPLETE"
    //         })
    //     )
        
    // } catch (error) {
    //     console.log(error);
        
    //     dispatch(
    //         addRequestState({
    //             name: "toggleTodoById",
    //             state: "ERROR"
    //         })
    //     )
    // }
}

// const logout = (): AppThunk => async (dispatch) => {
//     dispatch(authReduxSlice.actions.logoutSuccess())
// }

export default {
    getMessagesByConversationId,
    postMessage
    // getAllTodos,
    // postTodo,
    // deleteTodoById,
    // toggleTodoStateById
}