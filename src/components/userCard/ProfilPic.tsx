import {FC} from 'react'
import './profilPic.style.scss'

type Props = {
    _profilPicPath?: string,
    _isOnline?: boolean,
    _width: number,
    _height: number
}

const ProfilPic: FC<Props> = ({_profilPicPath, _isOnline, _width, _height}) => {
  return (
    <div className="profil-pic" style={{width: _width, height:_height}}>
        <img src={_profilPicPath?.replace('/public', '')}/>
        {_isOnline && <span className="online-dots"></span>}
    </div>
  )
}

export default ProfilPic;