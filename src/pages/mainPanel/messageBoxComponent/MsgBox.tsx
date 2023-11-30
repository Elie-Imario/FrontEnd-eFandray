import { FC, ReactNode } from 'react'
import './msgBox.style.scss'

type Props = {
    id_msg_owner: string,
    children: ReactNode
}

const MsgBox :FC<Props> = ({id_msg_owner, children}) => {
  return (
    <div className='msg-box' id={id_msg_owner}>
        {children}
    </div>
  )
}


export default MsgBox