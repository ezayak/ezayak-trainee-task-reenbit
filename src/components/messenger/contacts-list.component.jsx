import React, { useState, useEffect } from "react";
import { UserInfo } from "./contacts-components/user-info.component";
import { SearchBar } from "./contacts-components/search-bar.component";
import { db } from '../../utils/firebase/firebase';
import { collection, query, onSnapshot} from 'firebase/firestore';
import {timeStampToDate} from '../../utils/common/dateTimeFormat';
import './messenger.style.scss';
import { Spinner } from "../common/spinner/spinner.component";
import { Avatar } from "../common/avatar/avatar.component";
import { findMessages } from "../../utils/api/messages.firebase";

export const ContactsList = ({selectCurrentChat, currentChat, user}) => {
    const [contactList, setContactList] = useState([]);
    const [contactListFilter, setContactListFilter] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [loading, setLoading] = useState(false);

    const compareData = (a, b) => {
        if (a.new_message === b.new_message) {
            return a.time < b.time ? 1 : -1;
        } else {
            return a.new_message ? -1 : 1;
        }
    };

    const loadContacts = () => {
        setLoading(true);
        const q = query(collection(db, 'contacts')); //, where('date', '==', new Timestamp(stringToTimeStamp(newDate), 0))
        return onSnapshot(q, (querySnapshot) => {
            setLoading(false);
            setContactList([...querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    ...data,
                    last_active: timeStampToDate(data.last_active),
                    time: data.last_active.toDate(),
                    image: data.image ? `https://drive.google.com/uc?export=view&id=${data.image}` : '',
                    new_message_class_name: data.new_message ? 'new_message': '',
                    status: data.status.substring(0, 50) + '...',
                    idDiv: data.id
                };
                }).sort(compareData)
            ]);
        });
    }

    const loadSearch = (filter) => {
        setLoading(true);
        findMessages(filter, contactList)
            .then(res => {
                setContactListFilter({
                    contactList: contactList.filter(contact => contact.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0),
                    messages: res
                });
                setLoading(false);
            })
    }

    useEffect(() => {
        const unsubscribe = loadContacts();
        return unsubscribe;
    }, []);

    const handleSetFilter = (filter) => {
        setFilterString(filter);
        loadSearch(filter);
    }

    const renderList = (title, list) => {
        return (
            <>
                <div className="contact-list-title">{title}</div>
                <div className="contact-list-contacts">
                    {list.map(contact => 
                        <div key={contact.idDiv} className={`contact-list-contact` + (contact.idDiv === currentChat.idDiv ? ' current-chat' : '')} id={contact.id} onClick={() => selectCurrentChat(contact)}>
                            {
                                title !== 'Messages' &&
                                <div className="contact-list-image"><Avatar image={contact.image} name={contact.name}/></div>
                            }
                            <div className={`contact-list-data ${contact.new_message_class_name}`}>
                                <div className="contact-list-name">
                                    <div>
                                        {contact.name}
                                    </div>
                                    <div className="contact-list-date">
                                        {contact.last_active}
                                    </div>
                                </div>
                                <div className="contact-list-status">{contact.status}</div>
                            </div>
                        </div>
                        )}
                </div>
            </>
        );
    }

    return (
        <div className="contacts-list">
            <UserInfo user={user}/>
            <SearchBar setFilter={handleSetFilter}/>

            {loading && <Spinner />}
            {
                !loading &&
                    <div className='contact-list-chats'>
                        {filterString === '' && renderList('Chats', contactList)}
                        {
                            filterString !== '' ? 
                                <>
                                    {renderList('Contacts', contactListFilter.contactList)}
                                    {renderList('Messages', contactListFilter.messages)}
                                </>
                            : <></>}
                    </div>
            }
            <div className="contacts-list-bottom"></div>
        </div>
    );
}