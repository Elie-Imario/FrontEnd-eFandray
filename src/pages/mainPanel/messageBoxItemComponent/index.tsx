import { FC, ReactNode } from 'react';
import ProfilPic from '../../../components/userCard/ProfilPic';
import './msgBoxItem.style.scss'

type Props = {
    widthImg: number,
    heightImg: number,
    MsgBoxChatPic: string,
    MsgBoxChatName: string,
    MsgBoxChatStatus: boolean,
    UserMessage: string | ReactNode,
}
const MsgBoxItem :FC<Props>= ({MsgBoxChatPic, MsgBoxChatName, MsgBoxChatStatus, UserMessage, widthImg, heightImg}) => {
  return (
    <div className="message-box">
        <ProfilPic 
            _profilPicPath={MsgBoxChatPic}
            _width={widthImg}
            _height={heightImg}
            _isOnline={MsgBoxChatStatus}
        />
        <div className="msg-container">
            <span className="username">{MsgBoxChatName}</span>
            {typeof UserMessage !== "string" ? UserMessage : <span className="user-msg">{UserMessage}</span>}
        </div>
    </div>
  )
}

export default MsgBoxItem;