
import { useContext } from "react"
import { AppContext } from "../../services/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProfilPic from "../../components/userCard/ProfilPic"
import './sideBarStyle.scss'

const SideBar = () => {
    const { UserLogContext } = useContext(AppContext)
    return (
      <div className="SideBar-section">
          <div className="sideBar-bottom-section">
            <ProfilPic _isOnline={UserLogContext?.status as boolean} _height={54} _width={54} _profilPicPath={UserLogContext?.profilpic_path}/>
            <button className='btn btn-settings'><FontAwesomeIcon icon="sign-out-alt" size="lg" /></button>
          </div>
      </div>
    )
}

export default SideBar