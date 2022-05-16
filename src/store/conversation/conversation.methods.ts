import * as API from "../../API/index"
import { addRequestState } from "../requestState";
import { AppThunk } from "../store.types";
import { conversationsReduxSlice } from "./conversation";
import { sortArrayByObjKey } from "../../utils/global.functions";

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

        console.log('CONVERSATIONS LIST FETCHED SUCCESSFULLY');

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
    getConversations,
    // getMessagesByConversationId,
    // postMessage
    // getAllTodos,
    // postTodo,
    // deleteTodoById,
    // toggleTodoStateById
}