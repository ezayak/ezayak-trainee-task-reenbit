import React from "react";
import { FaUserCircle } from 'react-icons/fa';
import './avatar.style.scss';

export const Avatar = ({image, name, size=50}) => {
    return (
        <>
            {
                image === ''
                ? <FaUserCircle size={size}/>
                : <img className='avatar' src={image} alt={name}/>
            }
        </>
    );
}