import React, { useEffect, useState } from "react";
import { Spinner } from "../common/spinner/spinner.component";
import { ContactInfo } from "./messages-components/contact-info.component";
import { Message } from "./messages-components/message.component";
import { MessagesList } from "./messages-components/messages-list.component";
import { db } from '../../utils/firebase/firebase';
import { collection, query, onSnapshot, where, Timestamp} from 'firebase/firestore';
import { timeStampToDateWithTime} from '../../utils/common/dateTimeFormat';
import './messenger.style.scss';
import { sendMessage } from "../../utils/api/messages.firebase";
import { getJoke } from "../../utils/api/random-joke";

export const Messages = ({contact, removeCurrentChat}) => {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);

    const compareData = (a, b) => {
        return a.time > b.time ? 1 : -1;
    };

    const loadChat = () => {
        setLoading(true);
        const q = query(collection(db, 'messages'), where('contact', '==', contact.id));
        return onSnapshot(q, (querySnapshot) => {
            setLoading(false);
            const messagesData = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    ...data,
                    time: data.time.toDate(),
                    date: timeStampToDateWithTime(data.time)
                };
                }).sort(compareData);
            setMessages(messagesData);
        });
    }  

    const saveNewMessage = (message, sender) => {
        const record = {
            contact: contact.id,
            id: '',
            message: message,
            sender: sender,
            time: Timestamp.fromDate(new Date())
        };
    
        record.id = sendMessage(record);
    }

    const handleSendMessage = (message) => {
        saveNewMessage(message, false);
        setTimeout(() => {
            getJoke()
                .then(data => {
                    saveNewMessage(data.value, true);
                });
        }, 5000);  
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = loadChat();

        return unsubscribe;
    }, [contact]);

    return (
        <div className="messages">
            <div className="mobile-messages-view"></div>
            <ContactInfo contact={contact} removeCurrentChat={removeCurrentChat}/>
            {
                loading ? 
                    <div style={{height:'calc(100vh - 180px)', backgroundColor: 'var(--clr-background-light-grey)'}}>
                        <Spinner />
                    </div>
                :
                    <MessagesList messages={messages} image={contact.image} name={contact.name} idMessage={contact.idMessage}/>
            }
            <Message sendMessage={handleSendMessage}/>
        </div>
    );
}