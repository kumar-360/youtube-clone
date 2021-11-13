import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import HelmetCustom from '../../components/HelmetCustom';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import { getSubscribedChannelsFail, getSubscribedChannelsRequest, getSubscribedChannelsSuccess } from '../../redux/actions/subscriptionsAction';

const SubscriptionsScreen = () => {
    const authToken = useSelector(state => state.auth.accessToken);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSubscribedChannelsRequest());
        fetch(`https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`,
            {
                headers: new Headers({
                    'Authorization': 'Bearer ' + authToken,
                    'Accept': 'application/json'
                })
            })
            .then(res => res.json())
            .then(data => {
                dispatch(getSubscribedChannelsSuccess(data.items));
            })
            .catch(err => {
                dispatch(getSubscribedChannelsFail(err.message));
            })
    }, [authToken, dispatch]);
    const { loading, channels } = useSelector(state => state.subscribedChannels);
    return (
        <Container fluid>
            <HelmetCustom title='Subscriptions' />
            {!loading ? channels?.map(channel => <VideoHorizontal video={channel} key={channel.id} subscriptionsScreen />)
                :
                <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
                    <Skeleton width='100%' height='160px' count={20} />
                </SkeletonTheme>
            }
        </Container>
    );
};

export default SubscriptionsScreen;