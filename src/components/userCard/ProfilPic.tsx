import {FC} from 'react'
import './profilPic.style.scss'

type Props = {
    _profilPicPath: string,
    _width: number,
    _height: number
}

const ProfilPic: FC<Props> = ({_profilPicPath, _width, _height}) => {
  return (
    <div className="profil-pic" style={{width: _width, height:_height}}>
        <img src={_profilPicPath}/>
        <span className="online-dots"></span>
        {/* <p>
            <span className="dots-statement">
                <span className="dots single"></span>
                <span className="dots single1"></span>
                <span className="dots single2"></span>
            </span>
        </p> */}
    </div>
  )
}

export default ProfilPic;