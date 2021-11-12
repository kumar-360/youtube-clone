import React from 'react';
import { getAuth } from "firebase/auth";
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
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleSideBar, handleToggleSidebar }) => {
    const auth = getAuth();
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                dispatch(logout());
                sessionStorage.removeItem('ytc-access-token');
                sessionStorage.removeItem('ytc-user');
                history.push('/auth');
            })
            .catch(err => {
                console.log(err);
            })
    };
    return (
        <nav className={toggleSideBar ? 'sidebar open' : 'sidebar'} onClick={handleToggleSidebar}>
            <div>
                <MdHome size={23} />
                <span>Home</span>
            </div>
            <Link to='/feed/subscriptions'>
                <div>
                    <MdSubscriptions size={23} />
                    <span>Subscriptions</span>
                </div>
            </Link>
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
            <div onClick={handleLogout}>
                <MdExitToApp size={23} />
                <span>Log Out</span>
            </div>
            <hr />
        </nav>
    );
};

export default Sidebar;