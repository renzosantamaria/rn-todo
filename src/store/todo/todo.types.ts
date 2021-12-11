
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