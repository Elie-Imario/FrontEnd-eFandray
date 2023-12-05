import { gql } from "@apollo/client"

export const SING_IN_MUTATION = gql`
    mutation initSignIn($auth_identification: String!, $password: String!){
        SignIn(auth_identification: $auth_identification, password: $password){
            status
            message
            data {
                id
                login
                profilpic_path
                email
            }
        }
    } 
`

export const USER_SUBSCRIPTION = gql`
    subscription{
        newUserConnected{
            id,
            onlineStatus
        }
    }
`