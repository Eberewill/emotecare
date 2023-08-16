import type { User } from "./User";


export interface Conversation {
    ID: number;
    ReceiverID: number;
    SenderID: number;
    Content: string;
    Timestamp: string;
    Receiver: User;
    Sender: User;
}

export interface conversationResponse {
    conversations: Conversation[]
    users: User[]
    current_page: number
    page_size: number
    total_pages: number
}

 export interface serializedConversation {
    senderName: string
    message: string
    timesstap: string
    recieverName : string
    id: number
 }