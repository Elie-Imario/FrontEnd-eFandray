import { FC } from 'react';
import ProfilPic from '../../../components/userCard/ProfilPic';
import './msgBox.style.scss'

type Props = {
  _picPath: string,
  msgContent: string
}

const MsgBoxContent : FC<Props> = ({_picPath, msgContent}) => {
  return (
    <div className='msg-box-other-content'>
        <ProfilPic 
          _profilPicPath={_picPath}
          _height={54}
          _width={54}
        />
        <p>{msgContent}</p>
    </div>
  )
}

export default MsgBoxContent;