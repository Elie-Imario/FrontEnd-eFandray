import { FC } from 'react'
import Separator from '../../../../components/separator'
import './authHeader.style.scss'

type Props = {
    headerImgPath: string, 
    title: string, 
    subTitle: string, 
    textlead: string, 
    btnSpan: string
}

const AuthHeader : FC<Props> = ({headerImgPath, title, subTitle, textlead, btnSpan}) => {
    const toogleAuthSlide = ()=>{
        const authView = document.querySelector('.auth-limiter')
        const currentSlide = document.querySelector('.nextSlide')
        currentSlide ? authView?.classList.remove('nextSlide') : authView?.classList.add('nextSlide')
    }
    return (
        <div className="auth-header">
            <div className="auth-header-img">
                <img src={headerImgPath} />
            </div>
            <div className="auth-title">
                <h1>{title}</h1>
                <span>{subTitle}</span>
                
                <div className="other">
                    <Separator />
                    <div className="other-content">
                        <span className="txt1">
                            {textlead}
                        </span>
                        <button className="txt2" onClick={toogleAuthSlide}>
                            {btnSpan}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthHeader;