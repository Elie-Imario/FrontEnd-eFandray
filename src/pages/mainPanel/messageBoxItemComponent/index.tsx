import { FC } from 'react';
import ProfilPic from '../../../components/userCard/ProfilPic';
import './msgBoxItem.style.scss'

type Props = {
    profilPicPath: string,
    UserName: string,
    UserMessage: string,
    widthImg: number,
    heightImg: number,
}
const MsgBoxItem :FC<Props>= ({profilPicPath, UserName, UserMessage, widthImg, heightImg}) => {
  return (
    <div className="message-box">
        <ProfilPic 
            _profilPicPath={profilPicPath}
            _width={widthImg}
            _height={heightImg}
        />
        <div className="msg-container">
            <span className="username">{UserName}</span>
            <span className="user-msg">{UserMessage}</span>
        </div>
    </div>
  )
}

export default MsgBoxItem;