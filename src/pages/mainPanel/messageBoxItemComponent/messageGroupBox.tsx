import { FC, useContext } from 'react';
import ProfilPic from '../../../components/userCard/ProfilPic';
import './msgBoxItem.style.scss'
import { Chat } from '../../../services/data/dataTypes';
import { AppContext } from '../../../services/context';

type Props = {
  GroupChat : Chat
}
const MsgGroupBoxItem :FC<Props>= ({GroupChat}) => {
  const { UserLogContext } = useContext(AppContext)
  const topTwoUser = []
  for(let i =0; i<2; i++){
    if(GroupChat.usersSubscribed.length>2){
      const filterUseuSubscribed = GroupChat.usersSubscribed.filter(user => user.userId !== UserLogContext?.userId)
      topTwoUser.push(filterUseuSubscribed[i])
    }else{
      topTwoUser.push(GroupChat.usersSubscribed[i])
    }
  }
  return (
    <div className="message-box">
        {
          GroupChat.chatGroupPic !== undefined ? (
            <ProfilPic 
              _profilPicPath={GroupChat.chatGroupPic}   
              _width={50}
              _height={50}         
            />
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
        <div className="msg-container">
            <span className="username">{GroupChat.chatName}</span>
            <span className="user-msg">{GroupChat.message.length>0 ? GroupChat.message[0].messageContent : 'Demarrer une discussion' }</span>
        </div>
    </div>
  )
}

export default MsgGroupBoxItem;