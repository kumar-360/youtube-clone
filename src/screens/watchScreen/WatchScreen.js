import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Comments from '../../components/comments/Comments';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import VideoMetaData from '../../components/videoMetaData/VideoMetaData';
import { getRelatedVideosFail, getRelatedVideosRequest, getRelatedVideosSuccess, getVideoByIdFail, getVideoByIdRequest, getVideoByIdSuccess } from '../../redux/actions/videoActions';
import './_watchScreen.scss'

const WatchScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideoByIdRequest());
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
            .then(res => res.json())
            .then(data => {
                // console.log('===== fetching single video for watch screen')
                dispatch(getVideoByIdSuccess(data.items[0]));
            })
            .catch(err => {
                dispatch(getVideoByIdFail(err.message));
            })
        dispatch(getRelatedVideosRequest());
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&maxResults=15&type=video&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
            .then(res => res.json())
            .then(data => {
                // console.log('===== fetching related videos for watch screen')
                dispatch(getRelatedVideosSuccess(data))
            })
            .catch(err => dispatch(getRelatedVideosFail(err.message)))
    }, [dispatch, id]);
    const { video, loading } = useSelector(state => state.selectedVideo);
    const { videos, loading: relatedVideosLoading } = useSelector(state => state.relatedVideos);
    return (
        <Row>
            <Col lg={8}>
                <div className='watchScreen__player'>
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        frameBorder='0'
                        title={video?.snippet?.title}
                        allowFullScreen
                        width='100%'
                        height='100%'
                    >
                    </iframe>
                </div>
                {!loading && video ? <VideoMetaData video={video} videoId={id} /> : <h1>Loading...</h1>}
                <Comments videoId={id} totalComments={video?.statistics?.commentCount} />
            </Col>
            <Col lg={4}>
                {!relatedVideosLoading ? videos && videos.filter(video => video.snippet).map((video) => {

                    return <VideoHorizontal video={video} key={video.id.videoId} />
                        ;
                }) :
                    <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
                        <Skeleton width='100%' height='130px' count={15} />
                    </SkeletonTheme>
                }
            </Col>
        </Row>
    );
};

export default WatchScreen;