import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, IUserReduxState } from "./user.types"


const initialState: IUserReduxState= {
    user: {
        name: 'your name will appear here after you login',
        lastName: '',
        email: 'default@email.se',
        token: '',
        userId: undefined
    }
}

export const userReduxSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            state.user = {
                name: action.payload.name || 'No name',
                lastName: action.payload.lastName || 'no last name',
                email: action.payload.email || 'no email',
                token: action.payload.token || 'no token',
                userId: action.payload.userId
            }
        },
        clearUser(state){
            state.user = {
                name: '',
                lastName: '',
                email: '',
                token: '',
                userId: undefined
            }
        },

    },

})

export default userReduxSlice.reducer