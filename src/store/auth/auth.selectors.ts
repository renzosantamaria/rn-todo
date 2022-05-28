import { IReduxState } from "../store.types";
import { createSelector } from "@reduxjs/toolkit";

import { generateRequestStateSelectors } from "../requestState";

const authStateSelector = createSelector(
    (state:IReduxState) => state.auth,
    (authState) => authState.authState
)

const userIdSelector = createSelector(
    (state: IReduxState) => state.auth,
    (authState) => authState.userId
)

const loginCredentialsStateSelector = generateRequestStateSelectors(
    "login"
  );

const isLoginInProgressSelector = (state: IReduxState) => {
   return loginCredentialsStateSelector.isLoading(state)
}

const requestResetPasswordStateSelector = generateRequestStateSelectors(
    "requestResetPassword"
  );
const signupStateSelector = generateRequestStateSelectors("signup");

export default {
    authStateSelector,
    userIdSelector,
    loginCredentialsStateSelector,
    isLoginInProgressSelector,
    requestResetPasswordStateSelector,
    signupStateSelector
}