
export interface ITodosReduxState {
    todos : Todo[];
}

export type Todo = {
    id: number,
    text: string,
    done: boolean,
    userId: string,
    updatedAt?: string
} 

export type TodoFirebase = {
    id: string,
    text: string,
    done: boolean,
    userId: string,
    updatedAt?: string
} 