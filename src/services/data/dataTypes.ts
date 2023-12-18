export type Chat = {
    chatId: number,
    chatType: ChatType,
    chatName: string,
    nbUserSubscribed: number
    message: Message[]
    usersSubscribed: User[]
}

export type Message = {
    messageId: number,
    type: MsgType,
    messageContent: string,
    messagefilepath: string,
    createAt: Date,
    wasRead: boolean,
    FromUser: User,
    ToUser: User,
    chat: Chat,
}

export type User = {
    userId: number,
    login: string,
    email: string,
    password: string,
    profilpic_path: string,
    status: boolean
}

export type authUser = {
    userId: number,
    login: string,
    messagesPosted: Message[]
    chats: Chat[]
}

enum ChatType {
    group = "GROUP",
    private = "PRIVATE"
}    

enum MsgType {
    text = "TXT",
    image = "IMG",
    file = "FILE",
}

