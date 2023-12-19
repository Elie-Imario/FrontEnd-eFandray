import { useState, useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import UserCard from '../../components/userCard';
import Tag from '../../components/tag';
import MsgBoxItem from "./messageBoxItemComponent/messageBox";
import { User, Message, Chat } from "../../services/data/dataTypes";
import './mainPanel.styles.scss';
import { Box, FormControl } from "@mui/material";
import MsgBox from "./messageBoxComponent/MsgBox";
import MsgBoxContent from "./messageBoxComponent/MsgBoxContent";
import Dots from "../../components/dots";
import { AppContext } from "../../services/context";
import { DISCUSSION_QUERY } from "../../requests/userChat.request.gql";
import { useQuery } from "@apollo/client";
import MsgGroupBoxItem from "./messageBoxItemComponent/messageGroupBox";

type newMsg = {
    messageContent: string,
    FromUser: User,
}

const MainPanel = () => {
    const { UserLogContext } = useContext(AppContext)

    const [userchathistory, setUserChatHistory] = useState([])
    const [newMessage, setNewMessage] = useState<Message>({} as Message)
    const [file, setFile] = useState<File | undefined>(undefined)
    const [messageState, setMsgState] = useState(false)
    const [isTyping, setTypingState] = useState(false)
    const [usersTyping, setUserTyping] = useState<number[]>([])
    const refUploadFIle = useRef<HTMLInputElement>(null)  
    const ref = useRef<HTMLDivElement>(null)


    // --------- Fetch UserChatHistor -----------
    const {data} = useQuery(DISCUSSION_QUERY,{
        variables:{
            userId: UserLogContext?.userId,
            first: 1,
            orderDirection: "DESC"
        }
    })

    useEffect(()=>{
        if(data){
            setUserChatHistory(data.UserChatHistory)
        }
    }, [data])
 
    //UseEffect for auto-Scroll
    useEffect(() => ref.current?.scrollIntoView({behavior: "smooth"}), []);

    const [message, setMsg] = useState<newMsg>({
        messageContent: '',
        FromUser: UserLogContext as User
    })

    const handleUploadFile = () => {
        refUploadFIle.current?.click()
    }

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation()
        const selectedFiles = event.target.files as FileList;
        setFile(selectedFiles?.[0])
    }
    

    const handlePostNewMsg = ()=>{
        const MSG = {
            
        } as Message

        if(message.messageContent.trim()){
            setNewMessage(MSG)
            setMsgState(true)
            
            setTimeout(()=>{
                setMsgState(false)
                // conversation.conversationMessage.push(MSG)
                // setConversation({
                //     ...conversation,
                //     conversationMessage: conversation.conversationMessage     
                // })  
        
            },500)
            setMsg({...message, messageContent: ""})
        }
    }

    return (
        <div className="main view-2">
            <div className="bloc-page fullwidth">
                <div className="left-side">
                    <div className="header-section">
                        <div className="account-info">
                            <UserCard UserName={UserLogContext?.login as string} isOnline={UserLogContext?.status as boolean} Height={81} Width={81} ProfilPicPath={UserLogContext?.profilpic_path as string}/>
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
                                userchathistory.map((item:{chat: Chat}, index)=>{
                                    const friend = item.chat.usersSubscribed.filter(user => parseInt(user.userId as unknown as string) !== UserLogContext?.userId)[0]

                                    return(
                                        item.chat.chatType === "PRIVATE" ? (
                                            <MsgBoxItem key={index} 
                                                widthImg={60} heightImg={60} 
                                                MsgBoxChatPic = {friend.profilpic_path} 
                                                MsgBoxChatName = {friend.login}
                                                MsgBoxChatStatus = {friend.status}
                                                //UserMessage={ usersTyping.indexOf(item.chat.usersSubscribed.userId) !== -1 ? <Dots /> : item.chat.message[0].messageContent }
                                                UserMessage={ item.chat.message.length>0 ? item.chat.message[0].messageContent : 'Demarrer une discussion' }
                                            /> 
                                        ) :
                                        (
                                            <MsgGroupBoxItem key={index} GroupChat={item.chat}/> 

                                        )
                                    )
                                })   
                            }
                        </div>
                    </div>
                </div>
                
                <div className="right-side">
                    <div className="chat-room-section">
                        <div className="msg-box-section">
                            {/* {
                                conversation.conversationMessage.map((item, index)=>{
                                    return(
                                        item.fromUser.userId === UserLogContext?.userId ?
                                        <MsgBox id_msg_owner="my-msg" dataKeyMsg={`myMsg-${item.msgId}`} isNew={false} key={index}>{item.msgContent}</MsgBox>
                                        :
                                        <MsgBox id_msg_owner="orther-msg" dataKeyMsg={`otherMsg${item.msgId}`} isNew={false} key={index}>
                                            <MsgBoxContent 
                                                _picPath={item.fromUser.profilPic}
                                                msgContent={item.msgContent}
                                            />
                                        </MsgBox>
                                        
                                    )
                                })                                        
                            } */}
                            { messageState && <MsgBox id_msg_owner="my-msg" dataKeyMsg={`myMsg-${newMessage.messageId}`} isNew={messageState}>{newMessage.messageContent}</MsgBox> }

                            <div ref={ref} />
                        </div>
                        { isTyping && <MsgBox id_msg_owner="orther-msg" dataKeyMsg={'orther-while-typing'} isNew={true}>
                            <MsgBoxContent 
                                _picPath={"/images/1662650_1.jpg"}
                                msgContent={<Dots />}
                            />
                        </MsgBox>
                        }
                        
                    </div>
                    <div className="send-msgsection">
                        <div className="btn_groups">
                            <div className="upload-group">
                                <button className={file ? "btn btn-uploadFile active" : "btn btn-uploadFile"} onClick={handleUploadFile}>
                                    <FontAwesomeIcon icon="file" size="lg" />  
                                </button>
                                <input
                                    type="file"
                                    id="upload"
                                    name='upload_file'
                                    hidden
                                    ref={refUploadFIle}
                                    onChange={onChangeFile}
                                />
                                {
                                    file && <button type="button" className="btn- btn-cancel" onClick={()=>setFile(undefined)}>
                                                <FontAwesomeIcon icon='times' size='lg'/>
                                            </button>
                                }
                            </div>
                            <button className="btn voice-recorder">
                                <FontAwesomeIcon icon="microphone" size="lg" />  
                            </button>
                        </div>
                        <Box className="wrap-input100">
                            <FormControl className="input100" fullWidth>
                                <TextField fullWidth
                                    className="searchInput"
                                    placeholder="Ecrire ici..."
                                    value={message.messageContent}
                                    multiline
                                    maxRows={2}
                                    onChange={({target: {value}}) =>{
                                        setMsg({...message, messageContent : value })
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
