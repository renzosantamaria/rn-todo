import { IReduxState } from "../store.types";
import { createSelector } from "@reduxjs/toolkit";

// import { generateRequestStateSelectors } from "../requestState";

const userStateSelector = createSelector(
    (state: IReduxState) => state.user,
    (userState) => userState.user
)

export default {
    userStateSelector
}