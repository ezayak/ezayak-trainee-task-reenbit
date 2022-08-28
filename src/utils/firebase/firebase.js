import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();
auth.languageCode = 'en';

const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

const logout = () => { 
    return signOut(auth).then(() => {
        return { success: true };
      }).catch((error) => {
          return { success: false, message: error.message };
      });
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = () => signInWithPopup(auth, provider);

export { db, auth, onAuthStateChangedListener, logout, signInWithGoogle };