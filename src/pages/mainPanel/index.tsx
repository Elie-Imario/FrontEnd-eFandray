import { useState, useRef, useEffect, useContext, useMemo } from "react";
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
import { useLazyQuery, useQuery } from "@apollo/client";
import MsgGroupBoxItem from "./messageBoxItemComponent/messageGroupBox";
import { CHAT_QUERY, DISCUSSION_QUERY } from "../../requests/userChat.request.gql";
import { CHAT_MESSAGE_QUERY } from "../../requests/message.request.gql";
import MsgPicBox from "./messageBoxComponent/MsgPicBox";
import ChatCard from "../../components/chatCard";
import BlankPage from "../annexePage/blankPage";
import ChatGroupBlankPage from "../annexePage/chatGroupBlankPage";

type newMsg = {
    messageContent: string,
    FromUser: User,
}

const MainPanel = () => {
    const { UserLogContext } = useContext(AppContext)

    const [userchathistory, setUserChatHistory] = useState([])
    const [ChatMessage, setChatMessage] = useState<Message[]|undefined>([])
    const [CurrentChat, setCurrentChat] = useState<Chat|undefined>(undefined)
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

    //------- Fetch ChatMessage ----------------
    const [GetChatMessageQuery] = useLazyQuery(CHAT_MESSAGE_QUERY)

    //------- Fect Chat By PK ------------------
    const [GetChatById] = useLazyQuery(CHAT_QUERY)

    
    useEffect(()=>{
        if(data){
            setUserChatHistory(data.UserChatHistory)
        }
    }, [data])
 
    //UseEffect for auto-Scroll
    useEffect(() => ref.current?.scrollIntoView({behavior: "smooth"}), [ChatMessage]);

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

    const GetChatMessage = (chatId:number) => {
        GetChatMessageQuery({
            variables:{
                chatId
            }
        }).then(({data})=>{
            setChatMessage(data.ChatMessages)
        }) 

        GetChatById({
            variables:{
                chatId
            }
        }).then(({data})=>{
            setCurrentChat(data.Chat)
        })
    }

    const MsgOwners = useMemo(()=>{
        return ChatMessage?.map(msg=> msg.FromUser.userId)
    },[ChatMessage])
    

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
                                                chatId={item.chat.chatId}
                                                MsgBoxChatPic = {friend.profilpic_path} 
                                                MsgBoxChatName = {friend.login}
                                                MsgBoxChatStatus = {friend.status}
                                                //UserMessage={ usersTyping.indexOf(item.chat.usersSubscribed.userId) !== -1 ? <Dots /> : item.chat.message[0].messageContent }
                                                UserMessage={ item.chat.message.length>0 ? item.chat.message[0] : undefined}
                                                onMsgBoxClick = {GetChatMessage}
                                            /> 
                                        ) :
                                        (
                                            <MsgGroupBoxItem key={index}  
                                                GroupChat={item.chat}
                                                onMsgBoxClick = {GetChatMessage}
                                            /> 
                                        )
                                    )
                                })   
                            }
                        </div>
                    </div>
                </div>
                
                <div className="right-side">
                {
                    CurrentChat !== undefined ? (
                        ChatMessage!== undefined && ChatMessage.length>0 ?
                        (
                            <>
                                <div className="chat-room-header">
                                    <ChatCard currentChat={CurrentChat} />
                                </div>
                                <div className="chat-room-section">
                                    <div className="msg-box-section">
                                        {
                                            ChatMessage?.map((item:Message, index)=>{   
                                                return(
                                                    parseInt(item.FromUser.userId as unknown as string) === UserLogContext?.userId ?
                                                    <MsgBox id_msg_owner="my-msg" dataKeyMsg={`myMsg-${item.messageId}`} isNew={false} key={index}>
                                                        {
                                                            item.type === "IMG" ? <MsgPicBox imagePath={item.messagefilepath}/> : item.messageContent 
                                                        }
                                                    </MsgBox>
                                                    :
                                                    <MsgBox id_msg_owner="orther-msg" dataKeyMsg={`otherMsg${item.messageId}`} isNew={false} key={index}>
                                                        <MsgBoxContent 
                                                            _picPath={MsgOwners? MsgOwners[index] === MsgOwners[index+1] ? "" : item.FromUser.profilpic_path : "" }
                                                            msgContentType = {item.type}
                                                            msgContent={item.type === "TXT" ? item.messageContent : <MsgPicBox imagePath={item.messagefilepath}/>}
                                                        />        
                                                    </MsgBox>
                                                    
                                                )
                                            })                                        
                                        }
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
                            </>
                        ):
                        (
                            CurrentChat.chatType === "PRIVATE" ? <></> : <ChatGroupBlankPage currentChat={CurrentChat}/>
                        )   
                    ):
                    (
                        <BlankPage />
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default MainPanel;
