import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideos, getVideosByCategoryFail, getVideosByCategoryRequest, getVideosByCategorySuccess, popularVideosFail, popularVideosRequest } from '../../redux/actions/videoActions';
import './_categoriesBar.scss';

const keywords = ['All', 'React js', 'Angular js', 'React Native', 'Rest API', 'Redux', 'Music', 'Algorithm', 'Coding', 'Cricket', 'Guitar', 'Songs', 'Football', 'Real Madrid', 'BB ki Vines', 'Dev Ed', 'Veritasium'];

const CategoriesBar = () => {
    const [activeElement, setActiveElement] = useState('All');
    const [tempVar, setTempVar] = useState(false);
    const dispatch = useDispatch();
    const nextPageTokenData = useSelector(state => state.homeVideos.nextPageToken);
    useEffect(() => {
        if (activeElement === 'All' && tempVar === true) {
            dispatch(popularVideosRequest());
            fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=20&pageToken=${nextPageTokenData}&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    const videosData = {
                        videos: data.items,
                        nextPageToken: data.nextPageToken,
                        category: activeElement
                    }
                    dispatch(getPopularVideos(videosData));
                    console.log('===== clicked on All fetching')
                })
                .catch(err => {
                    dispatch(popularVideosFail(err.message));
                })
        } else if (activeElement !== 'All') {
            dispatch(getVideosByCategoryRequest());
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&pageToken=${nextPageTokenData}&q=${activeElement}&type=video&key=AIzaSyDPfH26mn8umXzswSpKHpKRp6ag1me3Yr0`)
                .then(res => res.json())
                .then(data => {
                    const videosData = {
                        videos: data.items,
                        nextPageToken: data.nextPageToken,
                        category: activeElement
                    }
                    dispatch(getVideosByCategorySuccess(videosData));
                    console.log('===== clicked on other categories fetching')
                })
                .catch(err => {
                    getVideosByCategoryFail(err.message);
                })
        }
    }, [activeElement])
    const handleActiveElement = (value) => {
        setActiveElement(value);
        setTempVar(true);
    }

    return (
        <div className='categoriesBar'>
            {keywords.map((item, index) => {
                return (
                    <span key={index} onClick={() => handleActiveElement(item)} className={activeElement === item ? 'active' : ''}>{item}</span>
                );
            })}
        </div>
    );
};

export default CategoriesBar;