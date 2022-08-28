import React, { useState } from "react";
import {FiSearch} from 'react-icons/fi';

export const SearchBar = ({setFilter}) => {
    const [filter, setFilterString] = useState('');

    const handleSearch = (event) => {
        if (event.key === 'Enter' || event.key === undefined) {
            setFilter(filter);
        }
    }

    const handleInputChange = (event) => {
        setFilterString(event.target.value)
    }

    return(
        <div className="search-bar-container">
            <FiSearch className="search-bar-icon"/>
            <input type={'text'} value={filter} placeholder={'Search or start new chat'} onKeyDown={handleSearch} onChange={handleInputChange}/>
        </div>
    );
}