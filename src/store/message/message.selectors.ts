import { IReduxState } from "../store.types";
import { createSelector } from "@reduxjs/toolkit";

import { generateRequestStateSelectors } from "../requestState";

const messagesStateSelector = createSelector(
    (state:IReduxState) => state.messages,
    (messageState) => messageState.messages
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
    messagesStateSelector
}