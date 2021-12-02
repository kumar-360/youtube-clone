import { CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEOS_FAIL, RELATED_VIDEOS_REQUEST, RELATED_VIDEOS_SUCCESS, SEARCH_VIDEOS_FAIL, SEARCH_VIDEOS_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS } from "../actionTypes";

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
                // videos: prevState.activeCategory === payload.category ? [...prevState.videos, ...payload.videos] : payload.videos,
                videos: payload.videos,
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

const initialStateSelectedVideo = {
    loading: false,
    video: null,
    error: null
}

export const selectedVideoReducer = (prevState = initialStateSelectedVideo, { type, payload }) => {
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

const initialStateRelatedVideos = {
    loading: false,
    videos: null,
    error: null
}

export const relatedVideosReducer = (prevState = initialStateRelatedVideos, { type, payload }) => {
    switch (type) {
        case RELATED_VIDEOS_REQUEST:
            return {
                ...prevState,
                loading: true,
            }
        case RELATED_VIDEOS_SUCCESS:
            return {
                ...prevState,
                loading: false,
                videos: payload
            }
        case RELATED_VIDEOS_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }
        default:
            return prevState;
    }
}

const initialStateSearchVideos = {
    loading: false,
    videos: null,
    error: null
}

export const searchVideosReducer = (prevState = initialStateSearchVideos, { type, payload }) => {
    switch (type) {
        case SELECTED_VIDEO_REQUEST:
            return {
                ...prevState,
                loading: true,
            }
        case SEARCH_VIDEOS_SUCCESS:
            return {
                ...prevState,
                loading: false,
                videos: payload
            }
        case SEARCH_VIDEOS_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }
        default:
            return prevState;
    }
}

const initialStateChannelVideos = {
    loading: false,
    videos: null,
    error: null
}

export const channelVideosReducer = (prevState = initialStateChannelVideos, { type, payload }) => {
    switch (type) {
        case CHANNEL_VIDEOS_REQUEST:
            return {
                ...prevState,
                loading: true,
            }
        case CHANNEL_VIDEOS_SUCCESS:
            return {
                ...prevState,
                loading: false,
                videos: payload
            }
        case CHANNEL_VIDEOS_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }
        default:
            return prevState;
    }
}