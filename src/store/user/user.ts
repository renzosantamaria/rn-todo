import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, IUserReduxState, UserFromUsersList } from "./user.types"


const initialState: IUserReduxState= {
    user: {
        name: 'your name will appear here after you login',
        lastName: '',
        email: 'default@email.se',
        token: '',
        userId: undefined
    },
    userList: []
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
        setUserList(state, action: PayloadAction<UserFromUsersList[]>){
            state.userList = action.payload
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
        clearUserList(state){
            state.userList = []
        },

    },

})

export default userReduxSlice.reducer