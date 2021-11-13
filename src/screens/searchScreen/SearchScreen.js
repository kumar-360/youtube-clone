import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import HelmetCustom from '../../components/HelmetCustom';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizontal';
import { getVideosBySearchFail, getVideosBySearchRequest, getVideosBySearchSuccess } from '../../redux/actions/videoActions';

const SearchScreen = () => {
    const { query } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideosBySearchRequest());
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video,channel&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
            .then(res => res.json())
            .then(data => {
                // console.log('===== fetching search results for query')
                dispatch(getVideosBySearchSuccess(data.items))
            })
            .catch(err => dispatch(getVideosBySearchFail(err.message)))
    }, [query, dispatch]);
    const { videos, loading } = useSelector(state => state.searchVideos);
    return (
        <Container>
            <HelmetCustom title='Search' />
            {
                !loading ? videos?.map(video => {
                    return <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
                })
                    :
                    <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
                        <Skeleton width='100%' height='160px' count={20} />
                    </SkeletonTheme>
            }
        </Container>
    );
};

export default SearchScreen;