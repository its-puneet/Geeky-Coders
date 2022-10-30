import React, {Fragment, useEffect, useState} from 'react';
import styled from "styled-components";
import SettingsIcon from '@mui/icons-material/Settings';
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {SideBarChat} from "./SideBarChat";
import db, {auth} from "../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import {signOut} from "../features/user";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";



export const Sidebars = ({userPhoto}) => {
    const dispatch = useDispatch();
    const [rooms, setRooms] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "rooms"), (snap) => {
            setRooms(snap.docs.map((item) => {
                return {
                    id: item.id,
                    data: item.data()
                }
            }))
        });

        return () => {
           unsubscribe();
        }

    }, [])

    const logOut = () => {
        auth.signOut().then(() => {
            dispatch(signOut)
        })
        nav('/')
        window.location.reload()
    }

    const [findRoom, setRoom] = useState('');

    const getRoom = (e) => {
        setRoom(e.target.value)
    }

    const f = rooms.filter((item) => {
        return item.data.name.includes(findRoom)
    });


   return (
        <Sidebar>
            <SidebarHeader>
                <img src={userPhoto} onClick={logOut} alt="user image"/>
                <SidebarHeaderRight>
                    <IconButton>
                        <SettingsIcon/>
                    </IconButton>
                    <IconButton>
                        <MessageIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </SidebarHeaderRight>
            </SidebarHeader>
            <SidebarSearchContainer>
                <div>
                    <SearchIcon/> <input onChange={getRoom} type="text" placeholder='Search or start a new chat'/>
                </div>
            </SidebarSearchContainer>
            <SideBarChatContainer>
                <SideBarChat addNewChat/>
                    {f.map((item) => (
                        <SideBarChat key={item.id} id={item.id} name={item.data.name}/>
                    ))}
            </SideBarChatContainer>
        </Sidebar>
   )
}


const Sidebar = styled.div`
 flex: 0.30;
  display: flex;
  flex-direction: column;
`;


const SidebarHeader = styled.div`
  display: flex;
  padding: 9px 10px;
  min-width: 10vw;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid black;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
`

const SidebarHeaderRight = styled.div``


const SidebarSearchContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 10px;
  background-color: #f9f7f7;


  div {
    padding: 5px 10px;
    background-color: white;
    display: flex;
    align-items: center;
    width: 100%;
    height: 35px;
    border-radius: 12px;
  }
  
  input {
    border: none;
    width: 100%;
    padding: 5px;
  }
  
  .MuiSvgIcon-root {
    color: gray;
    margin-right: 10px;
  }
  
`

const SideBarChatContainer = styled.div`
  padding: 10px;
  flex: 1;
  overflow-y: scroll;
  background-color: #f0f2f2;
`