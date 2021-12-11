import { IReduxState } from "../store.types";
import { createSelector } from "@reduxjs/toolkit";

import { generateRequestStateSelectors } from "../requestState";

const todosStateSelector = createSelector(
    (state:IReduxState) => state.todos,
    (authState) => authState.todos
)

// const userIdSelector = createSelector(
//     (state: IReduxState) => state.auth,
//     (authState) => authState.userId
// )

// const loginCredentialsStateSelector = generateRequestStateSelectors(
//     "loginCredentials"
//   );

// const isLoginInProgressSelector = (state: IReduxState) => {
//     loginCredentialsStateSelector.isLoading(state)
// }

// const requestResetPasswordStateSelector = generateRequestStateSelectors(
//     "requestResetPassword"
//   );
// const signupStateSelector = generateRequestStateSelectors("signup");

export default {
    todosStateSelector,
    // userIdSelector,
    // loginCredentialsStateSelector,
    // isLoginInProgressSelector,
    // requestResetPasswordStateSelector,
    // signupStateSelector
}