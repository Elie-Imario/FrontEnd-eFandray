import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import UserCard from '../../components/userCard';
import Tag from '../../components/tag';
import MsgBoxItem from "./messageBoxItemComponent";
import { userLastMsgs } from "../../services/data/database.mockup";
import { message } from "../../services/data/dataTypes";
import './mainPanel.styles.scss';

const MainPanel = () => {
    const [userLastMessages, setUserLastMsgs] = useState <message[]>(userLastMsgs)

    return (
        <div className="main view-2">
            <div className="bloc-page fullwidth">
                <div className="left-side">
                    <div className="header-section">
                        <div className="account-info">
                            <UserCard UserName='Imarioa' Height={81} Width={81} ProfilPicPath={'/images/imarioa.jpg'}/>
                            <button className='btn btn-settings'><FontAwesomeIcon icon="cog" size="lg" /></button>
                        </div>
                        <div className="searchField">                 
                            <TextField fullWidth
                                className="searchInput"
                                type="search"
                                variant="filled"
                                placeholder="Rechercher des amies..."
                                size="medium"
                                InputProps={{
                                startAdornment: (
                                        <InputAdornment position="start">
                                            <FontAwesomeIcon icon="search" size="lg" />   
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="msg-section">
                        <div className="msg-tags">
                            <Tag tagName='Vos messages' _isActive={true}>
                                <FontAwesomeIcon icon="comment" size="lg" />  
                            </Tag>
                            <Tag tagName='Vos Groupes' _isActive={false}>
                                <FontAwesomeIcon icon="users" size="lg" />  
                            </Tag>
                        </div>
                        <div className="message-boxes">
                            {
                                userLastMessages.map((item)=>{
                                    return <MsgBoxItem widthImg={60} heightImg={60} profilPicPath={item.fromUser.profilPic} UserName={item.fromUser.username} UserMessage={item.msgContent}/>
                                })   
                            }
                        </div>
                    </div>
                </div>

                    
                <div className="right-side">
                    {/* Chat-room-section */}
                        {/* send-msgSection */}
                    {/*  */}
                </div>
            </div>
        </div>
    )
}

export default MainPanel;
