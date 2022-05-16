import { IReduxState } from "../store.types";
import { createSelector } from "@reduxjs/toolkit";

import { generateRequestStateSelectors } from "../requestState";

const conversationsStateSelector = createSelector(
    (state:IReduxState) => state.conversations,
    (conversationState) => conversationState.conversations
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
    conversationsStateSelector
}