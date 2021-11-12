import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect } from 'react';
import ShowMoreText from "react-show-more-text";
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import './_videoMetaData.scss';
import { useDispatch, useSelector } from 'react-redux';
import { checkSubscriptionStatus, getChannelDetailsFail, getChannelDetailsRequest, getChannelDetailsSuccess } from '../../redux/actions/channelActions';

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
    const { channelId, channelTitle, description, title, publishedAt } = snippet;
    const { viewCount, likeCount, dislikeCount } = statistics;
    const dispatch = useDispatch();
    const authToken = useSelector(state => state.auth.accessToken);
    const channelDetails = useSelector(state => state.channelDetails.channel);
    const subscriptionStatus = useSelector(state => state.channelDetails.subscriptionStatus);
    const channelSnippet = channelDetails?.snippet;
    const channelStatistics = channelDetails?.statistics;
    useEffect(() => {
        dispatch(getChannelDetailsRequest());
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
            .then(res => res.json())
            .then(data => {
                console.log('===== fetching channel details from video metadata')
                dispatch(getChannelDetailsSuccess(data.items[0]));
            })
            .catch(err => {
                dispatch(getChannelDetailsFail(err.message));
            })
        fetch(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&forChannelId=${channelId}&mine=true&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`,
            {
                headers: new Headers({
                    'Authorization': 'Bearer ' + authToken,
                    'Accept': 'application/json'
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log('===== fetching subscription details from video metadata')
                dispatch(checkSubscriptionStatus(data));
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [dispatch, channelId, authToken]);
    return (
        <div className='videoMetaData'>
            <div className='videoMetaData__top'>
                <h5>{title}</h5>
                <div className='d-flex justify-content-between align-items-center py-1'>
                    <span>
                        {numeral(viewCount).format('0.a')} Views • {moment(publishedAt).fromNow()}
                    </span>
                    <div>
                        <span style={{ marginRight: '1rem' }}>
                            <MdThumbUp size={26} /> {numeral(likeCount).format('0.a')}
                        </span>
                        <span style={{ marginRight: '1rem' }}>
                            <MdThumbDown size={26} /> {numeral(dislikeCount).format('0.a')}
                        </span>
                    </div>
                </div>
            </div>
            <div className='videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3'>
                <div className='d-flex'>
                    <img src={channelSnippet?.thumbnails?.default?.url} alt='' className='rounded-circle' style={{ marginRight: '1rem' }} />
                    <div className='d-flex flex-column'>
                        <span>{channelTitle}</span>
                        <span>{numeral(channelStatistics?.subscriberCount).format('0.a')} Subscribers</span>
                    </div>
                </div>
                <button className={`btn border-0 p-2 m-2 ${subscriptionStatus && 'btn-gray'}`}>
                    {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>
            <div className='videoMetaData__description'>
                <ShowMoreText
                    lines={3}
                    more='SHOW MORE'
                    less='SHOW LESS'
                    anchorClass='showMoreText'
                    expanded={false}
                >
                    {description}
                </ShowMoreText>
            </div>
        </div>
    );
};

export default VideoMetaData;