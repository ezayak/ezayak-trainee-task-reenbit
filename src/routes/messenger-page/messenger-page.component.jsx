import React, { useState } from "react";
import { ContactsList } from "../../components/messenger/contacts-list.component";
import { Messages } from "../../components/messenger/messages.components";
import { updateNewMessages } from "../../utils/api/contacts.firebase";
import './messenger-page.style.scss';

export const MessengerPage = ({user}) => {
    const [currentChat, setCurrentChat] = useState('');
    const [selectedChatClass, setSelectedChatClass] = useState('');

    const handleSelectCurrentChat = (contact) => {
        setCurrentChat(contact);
        setSelectedChatClass(contact === '' ? '' : 'selected-chat');

        setTimeout(()=> {
            updateNewMessages(contact.id);
        }, 2000);
    }

    const handleRemoveCurrentChat = () => {
        setCurrentChat('');
        setSelectedChatClass('');
    }

    return (
        <div className="messenger-page-container">
            <div className={`contact-list-container ${selectedChatClass}`}>
                <ContactsList selectCurrentChat={handleSelectCurrentChat} currentChat={currentChat} user={user}/>
            </div>
            <div className="messages-container">
                {
                    currentChat === '' ?
                        <div></div>
                    :
                        <Messages contact={currentChat} removeCurrentChat={handleRemoveCurrentChat}/>
                }
            </div>
        </div>
    );
}