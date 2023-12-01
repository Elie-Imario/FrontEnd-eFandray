import { gql } from "@apollo/client"

export const SING_IN_MUTATION = gql`
    mutation initSignIn($auth_identification: String!, $password: String!){
        SignIn(auth_identification: $auth_identification, password: $password){
            statusCode
            message
        }
    } 
`