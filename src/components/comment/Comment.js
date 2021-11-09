import moment from 'moment';
import React from 'react';
import './_comment.scss';

const Comment = () => {
    return (
        <div className='comment p-2 d-flex'>
            <img src='/images/avatar-logo.png' alt='' className='rounded-circle' style={{ marginRight: '3rem' }} />
            <div className='comment__body'>
                <p className='comment__header mb-1'>
                    Kumar Shanu • {moment(2).fromNow()}
                </p>
                <p className='mb-0'>Nice Video!!!</p>
            </div>
        </div>
    );
};

export default Comment;