import React from "react";
import { FcGoogle } from 'react-icons/fc';
import { signInWithGoogle } from "../../utils/firebase/firebase";

export const LoginPage = () => {
  
    return (
        <div className="login-content">
            <button className="btn" onClick={signInWithGoogle}><FcGoogle style={{margin:'10px'}}/> Google login</button>
        </div>
    )
}