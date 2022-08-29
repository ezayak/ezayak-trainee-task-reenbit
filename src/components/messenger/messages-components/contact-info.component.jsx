import React from "react";
import { Avatar } from "../../common/avatar/avatar.component";
import { BiArrowBack } from "react-icons/bi";

export const ContactInfo = ({contact, removeCurrentChat}) => {
    return (
        <div className="contact-info-container">
            <div className="user-info-icon">
                <Avatar image={contact.image} name={contact.name}/>
            </div>
            <div className="user-info-name">{contact.name}</div> 
            <div className="back-arrow" onClick={removeCurrentChat}><BiArrowBack /></div>
        </div>
    );
}