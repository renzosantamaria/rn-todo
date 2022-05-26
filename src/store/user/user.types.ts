
export type User = {
    name: string;
    lastName: string;
    email: string;
    token: string;
    userId: number | undefined;
}

export type UserFromUsersList = {
    id: number;
    surname: string;
    lastName: string;
    email: string;
}

export interface IUserReduxState {
    user: User
    userList: UserFromUsersList[]
}
