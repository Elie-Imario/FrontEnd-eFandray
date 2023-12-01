import { FC, ReactNode } from 'react'
import './msgBox.style.scss'

type Props = {
    id_msg_owner: string,
    dataKeyMsg: string,
    isNew: boolean,
    children: string | ReactNode
}

const MsgBox :FC<Props> = ({id_msg_owner, dataKeyMsg, isNew, children}) => {
  return (
    <div className={isNew ? 'msg-box new': 'msg-box'} id={id_msg_owner} data-key-msg={dataKeyMsg}>
        {typeof children === "string" ? <div className="content"><p>{children}</p></div> : children}
    </div>
  )
}


export default MsgBox