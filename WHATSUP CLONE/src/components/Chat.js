import {Avatar, IconButton} from "@mui/material";
import {AttachFile, InsertEmoticon, MoreVert, SearchOutlined} from "@mui/icons-material";
import MicNoneIcon from '@mui/icons-material/MicNone';
import '../styles/Chat.css';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {collection, onSnapshot, doc, orderBy, query, addDoc, Timestamp} from "firebase/firestore";
import db from "../firebase-config";
import {useSelector} from "react-redux";
import {selectUserName} from "../features/user";


export const Chat = () => {
    const name = useSelector(selectUserName);
    const [face, setFace] = useState();
    const [message, setMessage] = useState('')
    const [room, setRoom] = useState('');
    const [text, setText] = useState([]);


    console.log(Timestamp.now())


    const {roomId} = useParams();

    useEffect(() => {

        if(roomId) {
            onSnapshot(doc(db, "rooms",  roomId), (doc) => {
                setRoom(doc.data().name);
            });

            const msgColl = query(collection(db, "rooms", roomId, "messages"), orderBy("timestamp"));
            onSnapshot(msgColl, (querySnapshot) => {
                setText(querySnapshot.docs.map(msg => msg.data()))
            });
        }

    }, [roomId])

    useEffect(() => {
        setFace(Math.floor(Math.random() * 5000));
    }, [])


    const createMessage = async (e) => {
        e.preventDefault();

        if(message === '') {
            alert('Make sure input message is not empty < 0')
            throw new Error('Input message must not be empty!');
        }
        setMessage('')
        const msgColl = query(collection(db, "rooms", roomId, "messages"));
        await addDoc(msgColl, {
            message: message,
            name,
            timestamp: Timestamp.now(),
        })
    }

    const messageText = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className="chat">
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${face}.svg`}/>
                <div className='chat__headerInfo'>
                    <h3>{room}</h3>
                    <p>{new Date(Timestamp.now().seconds * 1000).toLocaleString()}</p>
                </div>

                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {text.map((message) => (
                       <p key={message.id} className={`chat__message ${message.name === name && 'chat__receiver'}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                            <span className='chat__time'>{new Date(message.timestamp.seconds * 1000).toUTCString()}</span>
                    </p>
                )
                )}
            </div>
            <div className='chat__footer'>
                <InsertEmoticon/>
                <form onSubmit={createMessage}>
                    <input onChange={messageText} value={message} type="text" placeholder="Type a message"/>
                    <button>Send a message</button>
                </form>
                <MicNoneIcon/>
            </div>
        </div>
    )
}


