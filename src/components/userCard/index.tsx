import {FC} from 'react'
import ProfilPic from './ProfilPic'
import './userCard.style.scss'

type Props = {
    UserName: string,
    ProfilPicPath: string,
    Width: number,
    Height: number
}

const UserCard :FC<Props> = ({UserName, ProfilPicPath, Width, Height}) => {
  return (
    <div className="userCard">
        <ProfilPic
            _profilPicPath={ProfilPicPath}
            _width={Width}
            _height={Height}
        />
        <div className="userInfo">
            <span className="userName">{UserName}</span>
            <span className="state">Online</span>
        </div>
    </div>
  )
}

export default UserCard;