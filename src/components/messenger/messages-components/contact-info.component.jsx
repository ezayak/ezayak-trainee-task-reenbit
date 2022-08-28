import React from "react";
import { Avatar } from "../../common/avatar/avatar.component";

export const ContactInfo = ({contact}) => {
    return (
        <div className="contact-info-container">
            <div className="user-info-icon">
                <Avatar image={contact.image} name={contact.name}/>
            </div>
            <div className="user-info-name">{contact.name}</div>            
        </div>
    );
}