import { FC, useContext } from 'react';
import ProfilPic from '../../../components/userCard/ProfilPic';
import './msgBoxItem.style.scss'
import { Chat } from '../../../services/data/dataTypes';
import { AppContext } from '../../../services/context';

type Props = {
  GroupChat : Chat,
  // eslint-disable-next-line @typescript-eslint/ban-types
  onMsgBoxClick: Function
}
const MsgGroupBoxItem :FC<Props>= ({GroupChat, onMsgBoxClick}) => {
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
    <div className="message-box" onClick={() => onMsgBoxClick(parseInt(GroupChat.chatId as unknown as string))}>
        {
          GroupChat.chatGroupPic !== null ? (
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
            {GroupChat.message.length > 0 ? 
              (
                GroupChat.message[0].type === "IMG" ? 
                (
                  <span className="user-msg">{parseInt(GroupChat.message[0].FromUser.userId as unknown as string) === UserLogContext?.userId ? 'Vous avez envoyé une photo' : `${GroupChat.message[0].FromUser.login} a envoyé une photo`}</span>
                ):
                (
                  <span className="user-msg">{parseInt(GroupChat.message[0].FromUser.userId as unknown as string) === UserLogContext?.userId ? `Vous : ${GroupChat.message[0].messageContent}` : GroupChat.message[0].messageContent}</span>
                )
              ): 
              <span className="user-msg">Démarrer une discussion</span>
            }
        </div>
    </div>
  )
}

export default MsgGroupBoxItem;