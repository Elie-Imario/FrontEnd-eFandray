import { FC, useContext } from 'react'
import { Chat } from '../../services/data/dataTypes'
import { AppContext } from '../../services/context'
import ProfilPic from '../userCard/ProfilPic'
import './chatCard.style.scss'

type Props = {
    currentChat: Chat
}

const ChatCard : FC <Props> = ({currentChat}) => {
    const { UserLogContext } = useContext(AppContext)
    const topTwoUser = []
    const friend = currentChat.usersSubscribed.find(user => parseInt(user.userId as unknown as string) !== UserLogContext?.userId)

    for(let i =0; i<2; i++){
      if( currentChat.usersSubscribed.length > 2 ){
        const filterUseuSubscribed = currentChat.usersSubscribed.filter(user => user.userId !== UserLogContext?.userId)
        topTwoUser.push(filterUseuSubscribed[i])
      }else{
        topTwoUser.push(currentChat.usersSubscribed[i])
      }
    }
    return (
        <div className="chat-card">
            {
                currentChat.chatType === "PRIVATE" ?
                (
                    <div className='single-profil-pic'>
                        <ProfilPic 
                            _profilPicPath={friend?.profilpic_path}   
                            _width={54}
                            _height={54}         
                        />
                        <span className="username">{friend?.login}</span>
                    </div>
                )
                :
                (
                    <>
                        {
                            currentChat.chatGroupPic !== null ? (
                                <div className='single-profil-pic'>
                                    <ProfilPic 
                                        _profilPicPath={currentChat.chatGroupPic}   
                                        _width={50}
                                        _height={50}         
                                    />
                                    <span className="username">{currentChat.chatName}</span>
                                </div>
                            ):
                            (
                                <div className="multi-profil-pic">
                                    {
                                        topTwoUser.map((item, index)=>{
                                        return(
                                            <ProfilPic
                                            key={index}  
                                            _profilPicPath={item.profilpic_path}
                                            _width={45}
                                            _height={45}         
                                            />
                                        )
                                        })
                                    }
                                </div>

                            )
                        }
                    </>
                )
            }
            
        </div>
    )
}

export default ChatCard
