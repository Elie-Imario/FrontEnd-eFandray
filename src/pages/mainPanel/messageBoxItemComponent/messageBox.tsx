import { FC, ReactNode } from 'react';
import ProfilPic from '../../../components/userCard/ProfilPic';
import './msgBoxItem.style.scss'

type Props = {
    widthImg: number,
    heightImg: number,
    chatId: number,
    MsgBoxChatPic: string,
    MsgBoxChatName: string,
    MsgBoxChatStatus: boolean,
    UserMessage: string | ReactNode,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onMsgBoxClick: Function
}
const MsgBoxItem :FC<Props>= ({chatId, MsgBoxChatPic, MsgBoxChatName, MsgBoxChatStatus, UserMessage, widthImg, heightImg, onMsgBoxClick}) => {

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
            {typeof UserMessage !== "string" ? UserMessage : <span className="user-msg">{UserMessage}</span>}
        </div>
    </div>
  )
}

export default MsgBoxItem;