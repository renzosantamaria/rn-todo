import { Message } from "../message/message.types"


export interface IConversationsReduxState {
    conversations : Conversation[];
    unreadConversations : Conversation["id"][]
}

export type Recipient = {
    id: number,
    surname: string,
    lastname: string,
    email: string,
    conversationsIds: string,
    updatedAt?: string
}

export type Conversation = {
    id: number,
    membersId: string,
    name: string,
    updatedAt?: string,
    recipientsIds: number[],
    messages: Message[],
    recipientNames: string[],
    recipients: Recipient[]
} 
