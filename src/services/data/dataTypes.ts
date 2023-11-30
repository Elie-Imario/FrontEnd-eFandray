

export type conversation = {
    conversationId: number,
    convesationType: string,
    conversationMember: number[],
    conversationMessage: message[]
}

export type message = {
    msgId : number,
    msgContent: string,
    fromUser: User
}

export type User = {
    userId: number,
    username: string,
    profilPic: string
}

