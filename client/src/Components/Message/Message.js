import React from 'react'
import './Message.css'
import reactEmoji from 'react-emoji'

function Message({ message: { user, text }, name }) {
    let isSentByCurrentUser = false
    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
        isSentByCurrentUser = true;
    }
    return (
        isSentByCurrentUser ?
        (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10"> {trimmedName} </p>
                <div className="messageBox backgroundBlue">
                    <p className="messsageText colorWhite"> {reactEmoji.emojify(text)} </p>
                </div>
            </div>
        )
        :
        (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgrounLight">
                    <p className="messsageText colorDark"> {reactEmoji.emojify(text)} </p>
                </div>
                <p className="sentText"> {user} </p>
            </div>
        )
    )
}

export default Message
