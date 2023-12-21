import { FC } from 'react'
import './msgBox.style.scss'

type Props = {
    imagePath: string
}

const MsgPicBox:FC<Props> = ({imagePath}) => {
    return (
        <div className='msgPic-box-container'>
            <img src={imagePath?.replace('/public', '')} />
        </div>
    )
}


export default MsgPicBox;