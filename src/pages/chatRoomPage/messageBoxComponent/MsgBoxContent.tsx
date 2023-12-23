import { FC, ReactNode } from 'react';
import ProfilPic from '../../../components/userCard/ProfilPic';
import './msgBox.style.scss'

type Props = {
  _picPath?: string,
  msgContent: string | ReactNode,
  msgContentType?: string
}

const MsgBoxContent : FC<Props> = ({_picPath, msgContent, msgContentType}) => {
  return (
    <div className={`msg-box-other-content ${msgContentType === "IMG" ? 'flex-b' : 'flex-c' } `}>
        <ProfilPic 
          _profilPicPath = {_picPath}
          _height = {54}
          _width = {54}
        />
        {
          msgContentType === "IMG" ? msgContent :
          typeof msgContent === "string" ? <div className='content'><p>{msgContent}</p></div> : <div className='content'> {msgContent} </div>
        }
           
    </div>
  )
}

export default MsgBoxContent;