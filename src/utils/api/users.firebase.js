import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const TABLE_NAME = 'users';

const userExists = async (login) => { 
    const userDocRef = doc(db, TABLE_NAME, login);
    const userSnapshot = await getDoc(userDocRef);
    return userSnapshot.exists();
}

const getUserDataByLogin = async (login) => {
    const userDocRef = doc(db, TABLE_NAME, login);
    const userSnapshot = await getDoc(userDocRef);
    return userSnapshot.data();
};

export { userExists,  getUserDataByLogin};