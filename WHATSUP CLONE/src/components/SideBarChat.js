import '../styles/SideBar.css';
import {Avatar} from "@mui/material";
import {useEffect, useState} from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase-config";
import {Link} from "react-router-dom";

export const SideBarChat = ({id, name, addNewChat}) => {

    const [face, setFace] = useState('');


    useEffect(() => {
        setFace(Math.floor(Math.random() * 5000).toString());
    }, [])


    const createChat = async () => {
        const enteredRoomName = prompt('Enter chat name!');

        try {
            if(enteredRoomName) {
                await addDoc(collection(db, 'rooms'), {
                    name: enteredRoomName
                });
                return enteredRoomName;
            }
        } catch (e) {
            alert(e.message);
        }

    }

    return !addNewChat ? (
        <div className="SideBarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${face}.svg`}/>
            <Link to={`/rooms/${id}`}>
                <div className='SideBarChat__info'>
                    <h2>{name}</h2>
                </div>
            </Link>
        </div>
    ) : (
        <div onClick={createChat} className="SideBarChat">
            <h3>Add new Chat</h3>
        </div>
    )
}