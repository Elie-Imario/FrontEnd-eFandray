import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import UserCard from '../../components/userCard';
import Tag from '../../components/tag';
import MsgBoxItem from "./messageBoxItemComponent";
import { userLastMsgs, conversations } from "../../services/data/database.mockup";
import { User, conversation, message } from "../../services/data/dataTypes";
import './mainPanel.styles.scss';
import { Box, FormControl } from "@mui/material";
import MsgBox from "./messageBoxComponent/MsgBox";
import MsgBoxContent from "./messageBoxComponent/MsgBoxContent";



type newMsg = {
    msgContent: string,
    fromUser: User,
}

const MainPanel = () => {
    const [userLastMessages, setUserLastMsgs] = useState <message[]>(userLastMsgs)
    const [conversation, setConversation] = useState<conversation>(conversations as conversation)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth", block:"end"});
    }, [conversation.conversationMessage.length]);

    const connectedUser = {
        userId: 5,
        username: "Imarioa",
        profilPic: "/images/imarioa.jpg"
    } as User

    const [message, setMsg] = useState<newMsg>({
        msgContent: '',
        fromUser: connectedUser
    })

    const handlePostNewMsg = ()=>{
        const MSG = {
            msgId: conversation.conversationMessage[conversation.conversationMessage.length - 1].msgId +1,
            msgContent: message.msgContent,
            fromUser: message.fromUser
        } as message

        conversation.conversationMessage.push(MSG)
        setConversation({
            ...conversation,
            conversationMessage: conversation.conversationMessage
            
        })

        setMsg({...message, msgContent: ""})
    }

    return (
        <div className="main view-2">
            <div className="bloc-page fullwidth">
                <div className="left-side">
                    <div className="header-section">
                        <div className="account-info">
                            <UserCard UserName={connectedUser.username} Height={81} Width={81} ProfilPicPath={connectedUser.profilPic}/>
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
                                userLastMessages.map((item, index)=>{
                                    return <MsgBoxItem key={index} widthImg={60} heightImg={60} profilPicPath={item.fromUser.profilPic} UserName={item.fromUser.username} UserMessage={item.msgContent}/>
                                })   
                            }
                        </div>
                    </div>
                </div>

                    
                <div className="right-side">
                    <div className="chat-room-section">
                        <div className="msg-box-section">
                            {
                                conversation.conversationMessage.map((item, index)=>{
                                    return(
                                        item.fromUser.userId === connectedUser.userId ?
                                        <MsgBox id_msg_owner="my-msg" key={index}><p>{item.msgContent}</p></MsgBox>
                                        :
                                        <MsgBox id_msg_owner="orther-msg" key={index}>
                                            <MsgBoxContent 
                                                _picPath={item.fromUser.profilPic}
                                                msgContent={item.msgContent}
                                            />
                                        </MsgBox>
                                        
                                    )
                                })
                            }
                            <div ref={ref} />
                        </div>
                    </div>
                    <div className="send-msgsection">
                        <div className="btn_groups">
                            <button className="btn btn-uploadFile">
                                <FontAwesomeIcon icon="file" size="lg" />  
                            </button>
                            <button className="btn voice-recorder">
                                <FontAwesomeIcon icon="microphone" size="lg" />  
                            </button>
                        </div>
                        <Box className="wrap-input100">
                            <FormControl className="input100" fullWidth>
                                <TextField fullWidth
                                    className="searchInput"
                                    placeholder="Ecrire ici..."
                                    value={message.msgContent}
                                    onChange={({target: {value}}) =>{
                                        setMsg({...message, msgContent : value })
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <div className="btn_group">
                            <button className="btn btn-send" onClick={handlePostNewMsg}>
                                <FontAwesomeIcon icon="paper-plane" size="lg" />  
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPanel;
