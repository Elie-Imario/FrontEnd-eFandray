import {FC, ReactNode, createContext, useEffect, useState} from 'react'
import { User } from '../data/dataTypes'

type Props = {
    children: ReactNode,
}


export const AppContext = createContext({
    UserLogContext : {} as undefined | User,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setAppContext: (_val: User): void => { }
})

const AppProvider: FC<Props> = ({children}) => {
    const [UserLogContext, setUserLogContext] = useState<User | undefined>(undefined)
    
    useEffect(()=>{
        const logged = sessionStorage.getItem("connectedUser") !== null ? sessionStorage.getItem("connectedUser") : undefined
        try{
            if(logged){
                setUserLogContext(JSON.parse(logged) as User)
            }
        }catch(error){
            console.error(error)
        }
    }, [])

    const setAppContext = (user: User) => {
        setUserLogContext(user)
    }

    return (
        <AppContext.Provider value = {{
            UserLogContext,
            setAppContext
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider