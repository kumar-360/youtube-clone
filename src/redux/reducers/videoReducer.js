import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS } from "../actionTypes";

const initialStateHomeVideo = {
    videos: [],
    loading: false,
    nextPageToken: null,
    error: null,
    activeCategory: 'All'
};

export const homeVideosReducer = (prevState = initialStateHomeVideo, { type, payload }) => {
    switch (type) {
        case HOME_VIDEOS_SUCCESS:
            return {
                ...prevState,
                videos: prevState.activeCategory === payload.category ? [...prevState.videos, ...payload.videos] : payload.videos,
                loading: false,
                nextPageToken: payload.nextPageToken,
                activeCategory: payload.category
            }
        case HOME_VIDEOS_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }
        case HOME_VIDEOS_REQUEST:
            return {
                ...prevState,
                loading: true
            }
        default:
            return prevState;
    }
}

const initialStateSelectedvideo = {
    loading: false,
    video: null,
    error: null
}

export const selectedVideoReducer = (prevState = initialStateSelectedvideo, { type, payload }) => {
    switch (type) {
        case SELECTED_VIDEO_REQUEST:
            return {
                ...prevState,
                loading: true,
            }
        case SELECTED_VIDEO_SUCCESS:
            return {
                ...prevState,
                loading: false,
                video: payload
            }
        case SELECTED_VIDEO_FAIL:
            return {
                ...prevState,
                loading: false,
                video: null,
                error: payload
            }
        default:
            return prevState;
    }
}