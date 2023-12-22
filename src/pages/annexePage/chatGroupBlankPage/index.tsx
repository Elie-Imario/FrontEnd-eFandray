import { FC, useMemo } from 'react'
import { Chat } from '../../../services/data/dataTypes'
import './chatGroupBlankPage.style.scss'
import ProfilPic from '../../../components/userCard/ProfilPic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    currentChat: Chat
}

const ChatGroupBlankPage:FC<Props> = ({currentChat}) => {
    const topNineUser = useMemo(() => currentChat.usersSubscribed.map((user, index) => (user && index < 9) && user )
    , [currentChat])

    console.log(topNineUser)
    
    return (
        <div className='ChatGr-Blank-Page'>
            <div className="content">
                <div className="group-pic">
                {
                    currentChat.chatGroupPic !== null ? (
                        <ProfilPic 
                            _profilPicPath={currentChat.chatGroupPic}   
                            _width={150}
                            _height={150}         
                        />
                    ):
                    (
                        <div className="profile-container">
                            {
                                topNineUser.map((item, index)=>{
                                    return(
                                        <ProfilPic
                                            key={index}  
                                            _profilPicPath={item !== false ? item.profilpic_path : ""}
                                            _width={45}
                                            _height={45}         
                                        />
                                    )
                                })
                                
                            }
                            {
                                currentChat.usersSubscribed.length > 9 && <div className="more-profil-pic">
                                    <FontAwesomeIcon icon="ellipsis" />
                                </div>  
                            }
                        </div>
                    )
                }
                </div>
                <span>Vous pouvez désormais démarrer une discussion dans le groupe "{currentChat.chatName}"</span>
                <div className="getStarted-btn-group">
                    <button className="btn btn-primary">
                        <FontAwesomeIcon icon="rocket" size="lg" />
                        Démarrer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatGroupBlankPage