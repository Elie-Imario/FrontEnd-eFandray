import { gql } from "@apollo/client"

export const DISCUSSION_QUERY = gql`
    query DiscussionQuery($userId: Int! $first:Int $orderDirection: String ) {
        UserChatHistory(userId: $userId) {
            chat {
            chatId
            chatType
            chatGroupPic
            chatName
            message(first: $first,orderBy: {orderDirection: $orderDirection}) {
                type
                messageContent
                messagefilepath
                FromUser {
                    userId
                    login
                }
            }
            usersSubscribed {
                    userId
                    login
                    profilpic_path
                    status
                }
            }
        }
    }

`
export const CHAT_QUERY = gql`
    query ChatQuery($chatId: Int!) {
        Chat(chatId:$chatId) {
            chatId
            chatType
            chatName
            chatGroupPic
            usersSubscribed {
                userId
                login
                profilpic_path
            }
        }
    }

`