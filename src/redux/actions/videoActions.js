import { CHANNEL_VIDEOS_FAIL, CHANNEL_VIDEOS_REQUEST, CHANNEL_VIDEOS_SUCCESS, HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEOS_FAIL, RELATED_VIDEOS_REQUEST, RELATED_VIDEOS_SUCCESS, SEARCH_VIDEOS_FAIL, SEARCH_VIDEOS_REQUEST, SEARCH_VIDEOS_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS } from "../actionTypes";

export const getPopularVideos = (videosData) => {
    return {
        type: HOME_VIDEOS_SUCCESS,
        payload: videosData
    }
};
export const popularVideosRequest = () => {
    return {
        type: HOME_VIDEOS_REQUEST,
    }
};
export const popularVideosFail = (err) => {
    return {
        type: HOME_VIDEOS_FAIL,
        payload: err
    }
};
export const getVideosByCategoryRequest = () => {
    return {
        type: HOME_VIDEOS_REQUEST,
    }
};
export const getVideosByCategorySuccess = (videosData) => {
    return {
        type: HOME_VIDEOS_SUCCESS,
        payload: videosData
    }
};
export const getVideosByCategoryFail = (err) => {
    return {
        type: HOME_VIDEOS_SUCCESS,
        payload: err
    }
};
export const getVideoByIdRequest = () => {
    return {
        type: SELECTED_VIDEO_REQUEST,
    };
}
export const getVideoByIdSuccess = (id) => {
    return {
        type: SELECTED_VIDEO_SUCCESS,
        payload: id
    };
}
export const getVideoByIdFail = (err) => {
    return {
        type: SELECTED_VIDEO_FAIL,
        payload: err
    };
}
export const getRelatedVideosRequest = () => {
    return {
        type: RELATED_VIDEOS_REQUEST,
    };
}
export const getRelatedVideosSuccess = (data) => {
    return {
        type: RELATED_VIDEOS_SUCCESS,
        payload: data.items
    };
}
export const getRelatedVideosFail = (err) => {
    return {
        type: RELATED_VIDEOS_FAIL,
        payload: err
    };
}
export const getVideosBySearchRequest = () => {
    return {
        type: SEARCH_VIDEOS_REQUEST,
    }
};
export const getVideosBySearchSuccess = (videosData) => {
    return {
        type: SEARCH_VIDEOS_SUCCESS,
        payload: videosData
    }
};
export const getVideosBySearchFail = (err) => {
    return {
        type: SEARCH_VIDEOS_FAIL,
        payload: err
    }
};
export const getVideosByChannelRequest = () => {
    return {
        type: CHANNEL_VIDEOS_REQUEST,
    }
};
export const getVideosByChannelSuccess = (videosData) => {
    return {
        type: CHANNEL_VIDEOS_SUCCESS,
        payload: videosData
    }
};
export const getVideosByChannelFail = (err) => {
    return {
        type: CHANNEL_VIDEOS_FAIL,
        payload: err
    }
};
