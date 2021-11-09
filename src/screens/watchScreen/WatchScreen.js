import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Comments from '../../components/comments/Comments';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import VideoMetaData from '../../components/videoMetaData/VideoMetaData';
import { getVideoByIdFail, getVideoByIdRequest, getVideoByIdSuccess } from '../../redux/actions/videoActions';
import './_watchScreen.scss'

const WatchScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideoByIdRequest());
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
            .then(res => res.json())
            .then(data => {
                dispatch(getVideoByIdSuccess(data.items[0]));
            })
            .catch(err => {
                dispatch(getVideoByIdFail(err.message));
            })
    }, [dispatch, id]);
    const { video, loading } = useSelector(state => state.selectedVideo);
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
                <Comments videoId={id} />
            </Col>
            <Col lg={4}>
                {[...Array(10)].map(() => {
                    return (
                        <VideoHorizontal />
                    );
                })}
            </Col>
        </Row>
    );
};

export default WatchScreen;