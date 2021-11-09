import React, { useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import CategoriesBar from '../../components/categoriesBar/CategoriesBar';
import Video from '../../components/video/Video';
import { getPopularVideos, getVideosByCategoryFail, getVideosByCategoryRequest, getVideosByCategorySuccess, popularVideosFail, popularVideosRequest } from '../../redux/actions/videoActions';
import SkeletonVideo from '../../skeletons/SkeletonVideo';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const pageToken = useSelector(state => state.homeVideos.nextPageToken);
    // AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0 - mine
    //  AIzaSyDFPqLPCsfIHo5djSovBx7dnfwsCK1RkQM - kunal
    //  AIzaSyDLO-QcfHB9fBWitQo-MHvefclAQWLv1pU - kunal2
    useEffect(() => {
        dispatch(popularVideosRequest());
        fetch('https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=20&pageToken=&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0')
            .then(res => {
                return res.json();
            })
            .then(data => {
                const videosData = {
                    videos: data.items,
                    nextPageToken: data.nextPageToken,
                    category: 'All'
                }
                dispatch(getPopularVideos(videosData));
                console.log('===== home screen fetching')
            })
            .catch(err => {
                dispatch(popularVideosFail(err.message));
                console.log(err.message)
            })
    }, [dispatch]);

    const { videos, activeCategory, loading } = useSelector(state => state.homeVideos);
    const fetchData = () => {
        if (activeCategory === 'All') {
            dispatch(popularVideosRequest());
            fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=20&pageToken=${pageToken}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    const videosData = {
                        videos: data.items,
                        nextPageToken: data.nextPageToken,
                        category: activeCategory
                    }
                    dispatch(getPopularVideos(videosData));
                    console.log('===== infinite scroll for All fetching')
                })
                .catch(err => {
                    dispatch(popularVideosFail(err.message));
                })
        } else {
            dispatch(getVideosByCategoryRequest());
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&pageToken=${pageToken}&q=${activeCategory}&type=video&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
                .then(res => res.json())
                .then(data => {
                    const videosData = {
                        videos: data.items,
                        nextPageToken: data.nextPageToken,
                        category: activeCategory
                    }
                    dispatch(getVideosByCategorySuccess(videosData));
                    console.log('===== infinite scroll for other categories fetching')
                })
                .catch(err => {
                    getVideosByCategoryFail(err.message);
                })
        }
    }

    return (

        <Container>
            <CategoriesBar />
            <InfiniteScroll
                dataLength={videos && videos.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div className='spinner-border text-danger d-block mx-auto'></div>
                }
                className='row'
            >
                {!loading ? videos && videos.map((video) => {
                    const videoId = typeof (video.id) === 'string' ? video.id : video.id.videoId;
                    return (
                        <Col lg={3} md={4} key={videoId}>
                            <Video video={video} />
                        </Col>
                    );
                }) : [...Array(20)].map(() => {
                    return (
                        <Col lg={3} md={4}>
                            <SkeletonVideo />
                        </Col>
                    );
                })}
            </InfiniteScroll>
        </Container>
    );
};

export default HomeScreen;