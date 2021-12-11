import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { IAuthReduxState } from "./auth/auth.types"
import { IRequestStateRedux } from "./requestState";
import { IUserReduxState } from "./user/user.types";
import { ITodosReduxState } from "./todo/todo.types";

export interface IReduxState {
  requestState: IRequestStateRedux;
  auth: IAuthReduxState;
  user: IUserReduxState;
  todos: ITodosReduxState
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IReduxState,
  unknown,
  Action<string>
>;

export type RequestState = "INITIAL" | "LOADING" | "COMPLETE" | "ERROR";
export interface IRequestProps {
  state: RequestState;
}

