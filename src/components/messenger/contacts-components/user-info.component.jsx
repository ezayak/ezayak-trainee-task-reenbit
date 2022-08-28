import React from "react";
import { Avatar } from "../../common/avatar/avatar.component";

export const UserInfo = ({user}) => {
    return (
        <div className="user-info-container">
            <div className="user-info-icon">
                <Avatar image={user.photoURL} name={user.displayName}/>
            </div>
            <div className="user-info-name">{user.displayName}</div>
        </div>
    );
}