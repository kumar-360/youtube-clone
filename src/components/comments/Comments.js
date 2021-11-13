import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentFail, addCommentSuccess, getCommentsOfVideoByIdFail, getCommentsOfVideoByIdRequest, getCommentsOfVideoByIdSuccess } from '../../redux/actions/commentsAction';
import Comment from '../comment/Comment';
import './_comments.scss';

const Comments = ({ videoId, totalComments }) => {
    const [text, setText] = useState('');
    const authToken = useSelector(state => state.auth.accessToken);
    const dispatch = useDispatch();
    const commentsMapper = useSelector(state => state.commentsList.comments);
    const comments = commentsMapper?.map(comment => comment.snippet.topLevelComment.snippet);
    // const { photoURL } = useSelector(state => state.auth?.user);
    const getComments = () => {
        dispatch(getCommentsOfVideoByIdRequest());
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
                // console.log('===== fetching comments of videos')
            })
            .catch(err => {
                dispatch(getCommentsOfVideoByIdFail(err.message));
            })
    }
    useEffect(() => {
        getComments();
    }, [videoId, dispatch, authToken]);

    const handleComment = (e) => {
        e.preventDefault();
        if (text.length === 0) return;
        const obj = {
            snippet: {
                videoId: videoId,
                topLevelComment: {
                    snippet: {
                        textOriginal: text
                    }
                }
            }
        }
        fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + authToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('===== posting comment on video')
                setText('');
                dispatch(addCommentSuccess());
                getComments();
            })
            .catch(err => dispatch(addCommentFail(err.message)))
    }
    return (
        <div className='comments'>
            <p>{totalComments} Comments</p>
            <div className='comments__form d-flex w-100 m-2'>
                <img src='/images/avatar-logo.png' alt='' className='rounded-circle' style={{ marginRight: '1rem' }} />
                <form onSubmit={(e) => handleComment(e)} className='d-flex flex-grow-1'>
                    <input type='text' className='flex-grow-1' placeholder='Write a comment...' value={text} onChange={(e) => setText(e.target.value)} />
                    <button className='border-0 p-2'>Comment</button>
                </form>
            </div>
            <div className='comments__list'>
                {comments && comments.map((comment, index) => {
                    return (
                        <Comment comment={comment} key={index} />
                    );
                })}
            </div>
        </div>
    );
};

export default Comments;