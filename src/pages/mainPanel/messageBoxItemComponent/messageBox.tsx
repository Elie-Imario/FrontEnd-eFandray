import { FC, useContext } from 'react';
import ProfilPic from '../../../components/userCard/ProfilPic';
import './msgBoxItem.style.scss'
import { Message } from '../../../services/data/dataTypes';
import { AppContext } from '../../../services/context';

type Props = {
    widthImg: number,
    heightImg: number,
    chatId: number,
    MsgBoxChatPic: string,
    MsgBoxChatName: string,
    MsgBoxChatStatus: boolean,
    UserMessage: Message | undefined,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onMsgBoxClick: Function
}
const MsgBoxItem :FC<Props>= ({chatId, MsgBoxChatPic, MsgBoxChatName, MsgBoxChatStatus, UserMessage, widthImg, heightImg, onMsgBoxClick}) => {
    const { UserLogContext } = useContext(AppContext)
    return (
      <div className="message-box" onClick={() => onMsgBoxClick(parseInt(chatId as unknown as string))}>
          <ProfilPic 
              _profilPicPath={MsgBoxChatPic}
              _width={widthImg}
              _height={heightImg}
              _isOnline={MsgBoxChatStatus}
          />
          <div className="msg-container">
              <span className="username">{MsgBoxChatName}</span>
              {UserMessage === undefined ? 
                <span className="user-msg">Démarrer une discussion</span>
                : (
                  UserMessage.type === "IMG" ? 
                  (
                    <span className="user-msg">{parseInt(UserMessage.FromUser.userId as unknown as string) === UserLogContext?.userId ? 'Vous avez envoyer une photo' : `${UserMessage.FromUser.login} a envoyé une photo`}</span>
                  ):
                  (
                    <span className="user-msg">{parseInt(UserMessage.FromUser.userId as unknown as string) === UserLogContext?.userId ? `Vous : ${UserMessage.messageContent}` : UserMessage.messageContent}</span>
                  )
                  )
              }
          </div>
      </div>
    )
}

export default MsgBoxItem;