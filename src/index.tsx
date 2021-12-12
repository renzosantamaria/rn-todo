import React from "react";
import { Provider } from "react-redux";
import ReduxStore from "../src/store/index"

import { connect, ConnectedProps } from "react-redux";

import Navigation from '../src/navigation/Navigation'
import { IReduxState } from "../src/store/store.types";
import authSelectors from "../src/store/auth/auth.selectors";

const connectStateAndDispatch = connect(
  (state: IReduxState) => ({
    authState: authSelectors.authStateSelector(state)
  })
)

const App: React.FC<ConnectedProps<typeof connectStateAndDispatch> >= (props) => {
  return(
    <Provider store={ReduxStore}>
      <Navigation isAuthenticated={props.authState === "LOGGED_IN"} ></Navigation>
    </Provider>
  )
};

export default connectStateAndDispatch(App);