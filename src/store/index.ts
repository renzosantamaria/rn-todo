
import { combineReducers, Reducer, createStore, applyMiddleware, Action } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import { IReduxState } from "./store.types";

import authReducer from "./auth/auth"
import requestStateReducer from "./requestState"
import userReducer from "./user/user"
import todosReducer from "./todo/todo"
import messagesReducer from "./message/message"
import conversationsReducer from "./conversation/conversation"


const rootReducer: Reducer<IReduxState> = combineReducers<IReduxState>({
  requestState: requestStateReducer,
  auth: authReducer,
  user: userReducer,
  todos: todosReducer,
  messages: messagesReducer,
  conversations: conversationsReducer,
})

const middlewares = [thunk]

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware<ThunkDispatch<IReduxState, unknown, Action<string>>>(...middlewares)
  )
)


export default store