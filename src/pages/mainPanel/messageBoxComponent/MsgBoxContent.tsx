import { FC, ReactNode } from 'react';
import ProfilPic from '../../../components/userCard/ProfilPic';
import './msgBox.style.scss'

type Props = {
  _picPath: string,
  msgContent: string | ReactNode
}

const MsgBoxContent : FC<Props> = ({_picPath, msgContent}) => {
  return (
    <div className='msg-box-other-content'>
        <ProfilPic 
          _profilPicPath = {_picPath}
          _height = {54}
          _width = {54}
        />
        <div className='content'>{ typeof msgContent === "string" ? <p>{msgContent}</p> : msgContent }</div>
        
    </div>
  )
}

export default MsgBoxContent;