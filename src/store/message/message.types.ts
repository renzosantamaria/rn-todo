
export interface IMessagesReduxState {
    messages : Message[];
}

export type Message = {
    id: number,
    chatId: number,
    content: string,
    senderId: number,
    senderName: string,
    updatedAt?: string,
    timeStamp: string
} 
