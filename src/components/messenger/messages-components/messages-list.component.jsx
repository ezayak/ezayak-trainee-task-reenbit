import React, {createRef, useEffect, useRef, useState} from "react";
import { Avatar } from "../../common/avatar/avatar.component";

export const MessagesList = ({messages, image, name, idMessage}) => {
    const bottomRef = useRef(null);
    const [messageRef, setMessageRef] = useState([]);

    const renderMessage = (message) => {
        if (message.sender) {
            return (
                <div className="recieved-message-container" key={message.id} ref={messageRef[message.id]} >
                    <div className="avatar-container">
                        <Avatar image={image} name={name}/>
                    </div>
                    <div className="message-text-container">
                        <div className="message-text">{message.message}</div>
                        <div className="message-time">{message.date}</div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="sent-message-container" key={message.id} ref={messageRef[message.id]}>
                    <div className="message-text-container">
                        <div className="message-text">{message.message}</div>
                        <div className="message-time">{message.date}</div>
                    </div>
                </div>
            );
        }
    }

    useEffect(() => {
        if (!idMessage) {
            bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        } else {
            const refArr = [];
            messages.forEach(element => {
                refArr[element.id] = createRef();
            });
            setMessageRef(refArr);
        }
    }, [messages]);

    useEffect(() => {
        if (idMessage && messageRef[idMessage]) {
            messageRef[idMessage].current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [messageRef]);

    useEffect(() => {
        return () => {
            setMessageRef([]);
        }
    }, []);

    return (
        <div className="messages-list">
            {messages.map(message =>renderMessage(message))}
            <div ref={bottomRef} />
        </div>
    );
}