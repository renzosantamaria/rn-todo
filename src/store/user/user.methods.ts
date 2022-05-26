import * as API from "../../API/index"
import { addRequestState } from "../requestState";
import { AppThunk } from "../store.types";
import { userReduxSlice } from "./user";

const changeUserPassword = (newPassword: string): AppThunk => async (dispatch) => {
    try {
        if (!newPassword ) {
            throw new Error("Missing user token");
        }

        dispatch(
            addRequestState({
                name: "changeUserPassword",
                state: "LOADING"
            })
        )
        const response = await API.changeUserPassword(newPassword)
        if (!response) {
            throw new Error("Failed delete todo");
        }

        dispatch(
            addRequestState({
                name: "changeUserPassword",
                state: "COMPLETE"
            })
        )
        
    } catch (error) {
        console.log(error);
        
        dispatch(
            addRequestState({
                name: "changeUserPassword",
                state: "ERROR"
            })
        )
    }
}
const getAllUsers = (): AppThunk => async (dispatch) => {
    try {

        dispatch(
            addRequestState({
                name: "getAllUsers",
                state: "LOADING"
            })
        )
        const response = await API.fetchAllUsers()
        if (!response) {
            throw new Error("Failed to fetch users list");
        }
        dispatch(userReduxSlice.actions.setUserList(response))

        dispatch(
            addRequestState({
                name: "getAllUsers",
                state: "COMPLETE"
            })
        )
        
    } catch (error) {
        console.log(error);
        
        dispatch(
            addRequestState({
                name: "getAllUsers",
                state: "ERROR"
            })
        )
    }
}
export default {
    changeUserPassword,
    getAllUsers
}