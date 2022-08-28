import React, { useState } from "react";
import { BiSend } from 'react-icons/bi';

export const Message = ({sendMessage}) => {
    const [message, setMessage] = useState('');

    const handleOnChangeInput = (event) => {
        setMessage(event.target.value);
    }

    const handleSendMessage = (event) => {
        if (event.key === 'Enter' || event.key === undefined) {
            sendMessage(message);
            setMessage('');
        }
    }

    return (
        <div className="message-container">
            <BiSend className={'message-send-icon'} size={'20'} onClick={handleSendMessage}/>
            <input name="message" id="messagebox" value={message} placeholder={'Type your message'} onChange={handleOnChangeInput} onKeyDown={handleSendMessage}/>
        </div>
    );
}