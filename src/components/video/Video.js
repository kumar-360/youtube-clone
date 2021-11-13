import React, { useEffect, useState } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiFillEye } from 'react-icons/ai';
import './_video.scss';
import { useHistory } from 'react-router';

const Video = ({ video, channelScreen }) => {
    const [views, setViews] = useState(null);
    const [duration, setDuration] = useState(null);
    const [channelIcon, setChannelIcon] = useState(null);
    const history = useHistory();

    const seconds = moment.duration(duration).asSeconds();
    const formattedDuration = moment.utc(seconds * 1000).format('mm:ss');
    const { id, contentDetails, snippet: { channelId, channelTitle, title, publishedAt, thumbnails: { medium } } } = video;
    const videoId = id?.videoId || contentDetails?.videoId || id;
    useEffect(() => {
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
            .then(res => res.json())
            .then(data => {
                setDuration(data.items[0].contentDetails.duration);
                setViews(data.items[0].statistics.viewCount);
                // console.log('===== video duration fetching')
            })
            .catch(err => console.log(err));
    }, [videoId]);
    useEffect(() => {
        fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
            .then(res => res.json())
            .then(data => {
                setChannelIcon(data.items[0].snippet.thumbnails.default);
                // console.log('===== channel icon fetching')
            })
            .catch(err => console.log(err));
    }, [channelId]);

    const handleVideoClick = () => {
        history.push(`/watch/${videoId}`);
    }

    return (
        <div className='video' onClick={handleVideoClick}>
            <div className='video__top'>
                {/* <img src={medium.url} alt='' /> */}
                <LazyLoadImage src={medium && medium.url} effect='blur' />
                <span className='video__top__duration'>{formattedDuration}</span>
            </div>
            <div className='video__title'>{title}</div>
            <div className='video__details'>
                <span>
                    <AiFillEye /> {numeral(views).format('0.a')} Views &nbsp; • &nbsp;
                </span>
                <span>
                    {moment(publishedAt).fromNow()}
                </span>
            </div>
            {!channelScreen && <div className='video__channel'>
                <LazyLoadImage src={channelIcon && channelIcon.url} effect='blur' />
                <p>{channelTitle}</p>
            </div>}
        </div>
    );
};

export default Video;