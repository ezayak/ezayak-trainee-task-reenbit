import { doc, collection, setDoc, addDoc, query, where, getDocs } from "firebase/firestore";
import { timeStampToDateWithTime } from "../common/dateTimeFormat";
import { db } from "../firebase/firebase";
import { updateContact } from "./contacts.firebase";

const TABLE_NAME = 'messages';

const sendMessage = async (record) => {
    let id = '';
    const docRef = await(addDoc(collection(db, TABLE_NAME), record));
    id = docRef.id;

    await setDoc(doc(db, TABLE_NAME, id), {
        ...record,
        id: id
    });

    if (record.sender) {
        //gonna update contact info - last_active and new message
        await updateContact(record.contact, record.message);
    }

    return id;
};

const compareData = (a, b) => {
    return a.time > b.time ? 1 : -1;
};

const findMessages = async (filter, contacts) => {
    const collectionRef = collection(db, TABLE_NAME);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const queryMap = querySnapshot.docs.map(message => {
        const messageData = message.data();
        const contact = contacts.filter(contact => contact.id === messageData.contact)[0];
        return {
            ...messageData,
            idMessage: messageData.id,
            idDiv: messageData.id,
            id: messageData.contact,
            last_active: timeStampToDateWithTime(messageData.time),
            time: messageData.time.toDate(),
            date: timeStampToDateWithTime(messageData.time),
            name: contact.name,
            image: contact.image,
            status: messageData.message.substring(0, 50) + '...',
            new_message_class_name: ''
        };
    })
    .filter(message => message.message.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
    .sort(compareData);

    return queryMap;
}

export { sendMessage, findMessages };