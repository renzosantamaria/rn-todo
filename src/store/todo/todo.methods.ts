import * as API from "../../API/index"
import { addRequestState } from "../requestState";
import { AppThunk } from "../store.types";
import { todosReduxSlice } from "./todo";
import { sortArrayByObjKey } from "../../utils/global.functions";

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
        const sortedTodos = sortArrayByObjKey('asc', response, 'id')

        dispatch(todosReduxSlice.actions.setTodos(sortedTodos))

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
const postTodo = (text:string, userId: number): AppThunk => async (dispatch) => {
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
        
        // console.log('response: ', response)
        if (!response) {
            throw new Error("Failed to post data");
        }
        
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
const deleteTodoById = (todoId: number): AppThunk => async (dispatch) => {
    try {
        if (!todoId ) {
            throw new Error("Missing todo ID");
        }

        dispatch(
            addRequestState({
                name: "deleteTodoById",
                state: "LOADING"
            })
        )
        const response = await API.deleteTodoById(todoId)
        if (!response) {
            throw new Error("Failed delete todo");
        }
        
        dispatch(getAllTodos())

        dispatch(
            addRequestState({
                name: "deleteTodoById",
                state: "COMPLETE"
            })
        )
        
    } catch (error) {
        console.log(error);
        
        dispatch(
            addRequestState({
                name: "deleteTodoById",
                state: "ERROR"
            })
        )
    }
}
const toggleTodoStateById = (todoId: number): AppThunk => async (dispatch) => {
    try {
        if (!todoId ) {
            throw new Error("Missing todo ID");
        }

        dispatch(
            addRequestState({
                name: "toggleTodoById",
                state: "LOADING"
            })
        )
        const response = await API.toggleTodoDoneState(todoId)
        if (!response) {
            throw new Error("Failed delete todo");
        }
        
        dispatch(getAllTodos())

        dispatch(
            addRequestState({
                name: "toggleTodoById",
                state: "COMPLETE"
            })
        )
        
    } catch (error) {
        console.log(error);
        
        dispatch(
            addRequestState({
                name: "toggleTodoById",
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
    postTodo,
    deleteTodoById,
    toggleTodoStateById
}