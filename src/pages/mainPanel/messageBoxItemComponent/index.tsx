import { FC, ReactNode } from 'react';
import ProfilPic from '../../../components/userCard/ProfilPic';
import './msgBoxItem.style.scss'
import { User } from '../../../services/data/dataTypes';

type Props = {
    FromUser: User, 
    widthImg: number,
    heightImg: number,
    UserMessage: string | ReactNode,
}
const MsgBoxItem :FC<Props>= ({FromUser, UserMessage, widthImg, heightImg}) => {
  return (
    <div className="message-box">
        <ProfilPic 
            _profilPicPath={FromUser.profilPic}
            _width={widthImg}
            _height={heightImg}
        />
        <div className="msg-container">
            <span className="username">{FromUser.username}</span>
            {typeof UserMessage !== "string" ? UserMessage : <span className="user-msg">{UserMessage}</span>}
        </div>
    </div>
  )
}

export default MsgBoxItem;