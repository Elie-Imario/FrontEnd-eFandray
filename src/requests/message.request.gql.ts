import { gql } from "@apollo/client"

export const CHAT_MESSAGE_QUERY = gql`
    query ChatMessageQuery($chatId: Int!) {
    ChatMessages(chatId:$chatId){
        messageId
        type
        messageContent
        messagefilepath
        createAt
        wasRead
        FromUser {
            userId
            profilpic_path
        }
        ToUser {
            userId
        }
        chat {
            chatId
            }
        }
    }

`