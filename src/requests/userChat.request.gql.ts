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