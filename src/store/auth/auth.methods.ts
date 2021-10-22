import * as API from "../../API/index"
import { addRequestState } from "../requestState";
import { AppThunk } from "../store.types";
import { IloginCredentials } from "./auth.types";
import { userReduxSlice } from "../user/user";
import { authReduxSlice } from "./auth";


const login = (credentials: IloginCredentials): AppThunk => async (dispatch) => {
    try {
        if (!credentials.email || !credentials.password) {
            throw new Error("Missing credentials");
        }
        const email = credentials.email
        const password = credentials.password

        dispatch(
            addRequestState({
                name: "login",
                state: "LOADING"
            })
        )
        const response = await API.login(email, password)
        if (!response) {
            throw new Error("User not found");
        }
        console.log('response: ', response)

        dispatch(userReduxSlice.actions.setUser({
            name: response.user.surname,
            lastName: response.user.lastName,
            email: response.user.email,
            token: response.user.token
        }))
        dispatch(authReduxSlice.actions.loginSuccess("testId"))

        dispatch(
            addRequestState({
                name: "login",
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

const logout = (): AppThunk => async (dispatch) => {
    dispatch(authReduxSlice.actions.logoutSuccess())
}

export default {
    login,
    logout
}