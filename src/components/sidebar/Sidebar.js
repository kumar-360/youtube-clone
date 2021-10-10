import React from 'react';
import {
    MdSubscriptions,
    MdExitToApp,
    MdThumbUp,
    MdHistory,
    MdLibraryBooks,
    MdHome,
    MdSentimentDissatisfied
} from 'react-icons/md';
import './_sidebar.scss';

const Sidebar = () => {
    return (
        <nav className='sidebar'>
            <div>
                <MdHome size={23} />
                <span>Home</span>
            </div>
            <div>
                <MdSubscriptions size={23} />
                <span>Subscriptions</span>
            </div>
            <div>
                <MdThumbUp size={23} />
                <span>Liked Videos</span>
            </div>
            <div>
                <MdHistory size={23} />
                <span>History</span>
            </div>
            <div>
                <MdLibraryBooks size={23} />
                <span>Library</span>
            </div>
            <div>
                <MdSentimentDissatisfied size={23} />
                <span>I don't know</span>
            </div>
            <hr />
            <div>
                <MdExitToApp size={23} />
                <span>Log Out</span>
            </div>
            <hr />
        </nav>
    );
};

export default Sidebar;