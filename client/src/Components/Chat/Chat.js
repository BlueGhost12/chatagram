import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import './Chat.css';
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket;

function Chat() {
    const { search } = useLocation();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const ENDPOINT = "https://react-chat-application-begin.herokuapp.com/"
    useEffect(() => {
        const { name, room } = queryString.parse(search)

        // connecting localhost:3000 server to localhost:5000 server i.e. connecting backend and frontend servers
        socket = io(ENDPOINT);
        setRoom(room)
        setName(name)

        // sending joined user info to backend (server) through emmiting an event which will be recieved by event reciever at backend   
        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, search])

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        })
    }, [])

    const sendMessage = event => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} sendMessage={sendMessage} setMessage={setMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat