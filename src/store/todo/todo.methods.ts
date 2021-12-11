import * as API from "../../API/index"
import { addRequestState } from "../requestState";
import { AppThunk } from "../store.types";
import { todosReduxSlice } from "./todo";


const getAllTodos = (): AppThunk => async (dispatch) => {
    try {
        dispatch(
            addRequestState({
                name: "getAllTodos",
                state: "LOADING"
            })
        )
        const response = await API.fetchAllTodos()
        if (!response) {
            throw new Error("Could not find todos");
        }
        console.log('response: ', response)

        dispatch(todosReduxSlice.actions.setTodos(response))
        // dispatch(authReduxSlice.actions.loginSuccess("testId"))

        dispatch(
            addRequestState({
                name: "getAllTodos",
                state: "COMPLETE"
            })
        )
        
    } catch (error) {
        console.log(error);
        
        dispatch(
            addRequestState({
                name: "login",
                state: "ERROR"
            })
        )
    }
}
const postTodo = (text:string, userId: string): AppThunk => async (dispatch) => {
    try {
        if (!text || !userId) {
            throw new Error("Invalid todo");
        }

        dispatch(
            addRequestState({
                name: "postTodo",
                state: "LOADING"
            })
        )
        const response = await API.createTodo(text, userId)
        if (!response) {
            throw new Error("Failed to post data");
        }
        console.log('response: ', response)
        
        dispatch(getAllTodos())

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

// const logout = (): AppThunk => async (dispatch) => {
//     dispatch(authReduxSlice.actions.logoutSuccess())
// }

export default {
    getAllTodos,
    postTodo
}