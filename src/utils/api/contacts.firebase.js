import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const TABLE_NAME = 'contacts';

const updateContact = async (id, status) => {
    await updateDoc(doc(db, TABLE_NAME, id), {
        last_active: Timestamp.now(),
        new_message: true,
        status: status
    });
}

const updateNewMessages = async (id) => {
    await updateDoc(doc(db, TABLE_NAME, id), {
        new_message: false
    });
}

export { updateContact, updateNewMessages };