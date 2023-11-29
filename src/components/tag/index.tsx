import { FC, ReactNode } from 'react';
import './tag.style.scss'

type Props={
    tagName:string, 
    _isActive: boolean,
    children:ReactNode
}

const Tag: FC<Props> = ({tagName, _isActive, children}) => {
  return <div className={_isActive ? 'tag active':'tag' }>{children}<span>{tagName}</span></div>
}

export default Tag;
