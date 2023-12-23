
import { useContext } from "react"
import { AppContext } from "../../services/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProfilPic from "../../components/userCard/ProfilPic"
import './sideBarStyle.scss'

const SideBar = () => {
    const { UserLogContext, setAppContext } = useContext(AppContext)
    const setUpLogout = ()=>{
      sessionStorage.clear()
      setAppContext(undefined)
    }

    return (
      <div className="SideBar-section">
          <div className="sideBar-bottom-section">
            <ProfilPic _isOnline={UserLogContext?.status as boolean} _height={45} _width={45} _profilPicPath={UserLogContext?.profilpic_path}/>
            <button className='btn btn-settings' onClick={setUpLogout}><FontAwesomeIcon icon="sign-out-alt" size="lg" /></button>
          </div>
      </div>
    )
}

export default SideBar