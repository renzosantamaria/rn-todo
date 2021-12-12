
export type AuthState = "INITIAL" | "LOGGED_IN" | "LOGGED_OUT"
export interface IAuthReduxState {
    authState : AuthState;
    userId: number | undefined;
}

export interface IloginCredentials {
    email: string;
    password: string;
}