import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from '../../firebase';
import './_loginScreen.scss';
import { login, loginFail, loginRequest } from '../../redux/actions/authActions';
import { useHistory } from 'react-router';
import HelmetCustom from '../../components/HelmetCustom';

const LoginScreen = () => {
    const app = initializeApp(firebaseConfig);
    const dispatch = useDispatch();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const history = useHistory();
    const accessToken = useSelector(state => state.auth.accessToken);
    useEffect(() => {
        if (accessToken) {
            history.push('/');
        }
    }, [accessToken, history]);
    const handleLogin = () => {
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
        signInWithPopup(auth, provider)
            .then(result => {
                dispatch(loginRequest());
                const loginData = {
                    accessToken: result._tokenResponse.oauthAccessToken,
                    profile: {
                        name: result.user.displayName,
                        photoURL: result.user.photoURL
                    }
                }
                sessionStorage.setItem('ytc-access-token', loginData.accessToken);
                sessionStorage.setItem('ytc-user', JSON.stringify(loginData.profile));
                dispatch(login(loginData));
            })
            .catch(err => {
                dispatch(loginFail(err.message));
            });
    };

    return (
        <div className='login'>
            <HelmetCustom title='Login' />
            <div className='login__container'>
                <img src='/images/youtube-logo.png' alt='' />
                <button onClick={handleLogin}>Login With Google</button>
                <p>Made using YouTube Data API. Please login to view the complete project.</p>
            </div>
        </div>
    );
};

export default LoginScreen;