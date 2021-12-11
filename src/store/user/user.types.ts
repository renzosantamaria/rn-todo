
export type User = {
    name: string;
    lastName: string;
    email: string;
    token: string
}

export interface IUserReduxState {
    user: User
}
