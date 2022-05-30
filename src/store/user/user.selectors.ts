import { IReduxState } from "../store.types";
import { createSelector } from "@reduxjs/toolkit";

import { generateRequestStateSelectors } from "../requestState";

const userStateSelector = createSelector(
    (state: IReduxState) => state.user,
    (userState) => userState.user
)
const usersListStateSelector = createSelector(
    (state: IReduxState) => state.user,
    (userListState) => userListState.userList
)
const onlineUsersIds = createSelector(
    (state: IReduxState) => state.user,
    (userState) => userState.onlineUsersIds
)

const registerUserStateSelector = generateRequestStateSelectors("registerUser");

const isRegisterInProgressSelector = (state: IReduxState) => registerUserStateSelector.isLoading(state)

export default {
    userStateSelector,
    usersListStateSelector,
    registerUserStateSelector,
    isRegisterInProgressSelector,
    onlineUsersIds
}