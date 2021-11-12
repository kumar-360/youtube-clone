import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Video from '../../components/video/Video';
import './_channelScreen.scss';
import { checkSubscriptionStatus, getChannelDetailsFail, getChannelDetailsRequest, getChannelDetailsSuccess } from '../../redux/actions/channelActions';
import { getVideosByChannelFail, getVideosByChannelRequest, getVideosByChannelSuccess } from '../../redux/actions/videoActions';

const ChannelScreen = () => {
    const { channelId } = useParams();
    const dispatch = useDispatch();
    const authToken = useSelector(state => state.auth.accessToken);
    useEffect(() => {
        dispatch(getChannelDetailsFail('Cannot fetch'));
        dispatch(getVideosByChannelRequest());
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails&id=${channelId}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
            .then(res => res.json())
            .then(data => {
                const uploadPlayListId = data.items[0].contentDetails.relatedPlaylists.uploads;
                fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${uploadPlayListId}&maxResults=30&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
                    .then(res => res.json())
                    .then(data => {
                        dispatch(getVideosByChannelSuccess(data.items));
                        dispatch(getChannelDetailsRequest());
                        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
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
                                console.log('***** getting subscription status')
                                dispatch(checkSubscriptionStatus(data));
                            })
                    })
            })
            .catch(err => dispatch(getVideosByChannelFail(err.message)))
    }, [channelId, dispatch]);
    const { videos, loading } = useSelector(state => state.channelVideos);
    const channelDetails = useSelector(state => state.channelDetails);
    return (
        <>
            {channelDetails && channelDetails.channel && <div className='px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader'>
                <div className='d-flex align-items-center'>
                    <img src={channelDetails.channel.snippet?.thumbnails?.default?.url} alt='' />
                    <div className='mx-3 channelHeader__details'>
                        <h3>{channelDetails.channel.snippet?.title}</h3>
                        <span>
                            {numeral(channelDetails.channel.statistics?.subscriberCount).format('0.a')}{' '}
                            Subscribers
                        </span>
                    </div>
                </div>
                <button className={`btn border-0 p-2 m-2 ${channelDetails.subscriptionStatus && 'btn-gray'}`}>
                    {channelDetails.subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>}
            <Container>
                <Row className='mt-2'>
                    {
                        !loading ? videos?.map(video => <Col md={4} lg={3}>
                            <Video video={video} channelScreen />
                        </Col>)
                            :
                            [...Array(15)].map(() => {
                                <Col md={4} lg={3}>
                                    <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
                                        <Skeleton width='100%' height='140px' />
                                    </SkeletonTheme>
                                </Col>
                            })
                    }
                </Row>
            </Container>
        </>
    );
};

export default ChannelScreen;