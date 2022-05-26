import { IReduxState } from "../store.types";
import { createSelector } from "@reduxjs/toolkit";

// import { generateRequestStateSelectors } from "../requestState";

const userStateSelector = createSelector(
    (state: IReduxState) => state.user,
    (userState) => userState.user
)
const usersListStateSelector = createSelector(
    (state: IReduxState) => state.user,
    (userListState) => userListState.userList
)

export default {
    userStateSelector,
    usersListStateSelector
}