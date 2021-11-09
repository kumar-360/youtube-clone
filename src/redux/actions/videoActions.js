import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS } from "../actionTypes";

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
