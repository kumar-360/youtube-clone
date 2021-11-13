import React, { useEffect, useState } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiFillEye } from 'react-icons/ai';
import './_videoHorizontal.scss';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

const VideoHorizontal = ({ video, searchScreen, subscriptionsScreen }) => {
    const [views, setViews] = useState(null);
    const [duration, setDuration] = useState(null);
    const [channelIcon, setChannelIcon] = useState(null);
    const { id, snippet } = video;
    const { channelId, channelTitle, description, title, publishedAt, thumbnails: { medium }, resourceId } = snippet;
    const { videoId } = id;
    const isVideo = !(id.kind === 'youtube#channel' || subscriptionsScreen);
    //culprit
    useEffect(() => {
        if (isVideo) {
            fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
                .then(res => res.json())
                .then(data => {
                    // console.log('===== fetching duration and views of videos horizontal')
                    setDuration(data.items[0].contentDetails.duration);
                    setViews(data.items[0].statistics.viewCount);
                })
                .catch(err => console.log(err));
        }
    }, [videoId, isVideo]);
    useEffect(() => {
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
            .then(res => res.json())
            .then(data => {
                // console.log('===== fetching channel icon of videos horizontal')
                setChannelIcon(data.items[0].snippet.thumbnails.default);
            })
            .catch(err => console.log(err));
    }, [channelId]);
    const seconds = moment.duration(duration).asSeconds();
    const formattedDuration = moment.utc(seconds * 1000).format('mm:ss');
    const history = useHistory();
    const _channelId = resourceId?.channelId || channelId;
    const handleClick = () => {
        isVideo ? history.push(`/watch/${videoId}`) : history.push(`/channel/${_channelId}`);
    }
    const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel';
    return (
        <Row className='videoHorizontal m-1 py-2 align-items-center' onClick={handleClick}>
            <Col xs={6} md={searchScreen || subscriptionsScreen ? 4 : 6} className='videoHorizontal__left'>
                <LazyLoadImage src={medium && medium.url} effect='blur' className={`videoHorizontal__thumbnail ${thumbnail}`} wrapperClassName='videoHorizontal__thumbnail-wrapper' />
                {isVideo && <span className='videoHorizontal__duration'>{formattedDuration}</span>}
            </Col>
            <Col xs={6} md={searchScreen || subscriptionsScreen ? 8 : 6} className='videoHorizontal__right'>
                <p className='videoHorizontal__title mb-1'>
                    {title}
                </p>
                {isVideo && <div className='videoHorizontal__details'>
                    <AiFillEye /> {numeral(views).format('0.a')} Views •
                    {moment(publishedAt).fromNow()}
                </div>}
                {(searchScreen || subscriptionsScreen) && <p className='mt-1 videoHorizontal__description'>{description}</p>}
                <div className='videoHorizontal__channel d-flex my-1 align-items-center'>
                    {isVideo && <LazyLoadImage src={channelIcon?.url} effect='blur' />}
                    <p className='mb-0'>{channelTitle}</p>
                </div>
                {subscriptionsScreen && <p className='mt-2'>
                    {video?.contentDetails?.totalItemCount} Videos
                </p>}
            </Col>
        </Row>
    );
};

export default VideoHorizontal;