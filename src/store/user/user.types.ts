
export type User = {
    name: string;
    lastName: string;
    email: string;
    token: string;
    userId: number | undefined;
}

export interface IUserReduxState {
    user: User
}
