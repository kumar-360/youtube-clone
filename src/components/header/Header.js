import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';
import './_header.scss';
import { useHistory } from 'react-router';

const Header = ({ handleToggleSidebar }) => {
    const [input, setInput] = useState('');
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${input}`);
    }
    return (
        <div className='header'>
            <FaBars className='header__menu' size={26} onClick={handleToggleSidebar} />
            <img className='header__logo' src='/images/youtube-logo.png' alt='Youtube Logo' />
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type='text' placeholder='Search' value={input} onChange={(e) => setInput(e.target.value)} />
                <button type='submit'>
                    <AiOutlineSearch size={22} />
                </button>
            </form>
            <div className='header__icons'>
                <MdNotifications size={28} />
                <MdApps size={28} />
                <img src='/images/avatar-logo.png' alt='Avatar Logo' />
            </div>
        </div>
    );
};

export default Header;