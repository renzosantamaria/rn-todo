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

// const logout = (): AppThunk => async (dispatch) => {
//     dispatch(authReduxSlice.actions.logoutSuccess())
// }

export default {
    getAllTodos
}