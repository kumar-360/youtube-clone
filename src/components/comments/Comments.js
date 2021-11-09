import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsOfVideoByIdFail, getCommentsOfVideoByIdRequest, getCommentsOfVideoByIdSuccess } from '../../redux/actions/commentsAction';
import Comment from '../comment/Comment';
import './_comments.scss';

const Comments = ({ videoId }) => {
    const authToken = useSelector(state => state.auth.accessToken);
    const dispatch = useDispatch();
    useEffect(() => {
        getCommentsOfVideoByIdRequest();
        fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`,
            {
                headers: new Headers({
                    'Authorization': 'Bearer ' + authToken,
                    'Accept': 'application/json'
                })
            })
            .then(res => res.json())
            .then(data => {
                dispatch(getCommentsOfVideoByIdSuccess(data));
            })
            .catch(err => {
                dispatch(getCommentsOfVideoByIdFail(err.message));
            })
    }, []);

    const handleComment = () => {

    }
    return (
        <div className='comments'>
            <p>1234 Comments</p>
            <div className='comments__form d-flex w-100 m-2'>
                <img src='/images/avatar-logo.png' alt='' className='rounded-circle' style={{ marginRight: '1rem' }} />
                <form onSubmit={handleComment} className='d-flex flex-grow-1'>
                    <input type='text' className='flex-grow-1' placeholder='Write a comment...' />
                    <button className='border-0 p-2'>Comment</button>
                </form>
            </div>
            <div className='comments__list'>
                {[...Array(15)].map(() => {
                    return (
                        <Comment />
                    );
                })}
            </div>
        </div>
    );
};

export default Comments;