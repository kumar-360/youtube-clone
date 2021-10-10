import React from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdNotifications, MdApps } from 'react-icons/md';
import './_header.scss';

const Header = () => {
    return (
        <div className='header'>
            <FaBars className='header__menu' size={26} />
            <img className='header__logo' src='/images/youtube-logo.png' alt='Youtube Logo' />
            <form>
                <input type='text' placeholder='Search' />
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