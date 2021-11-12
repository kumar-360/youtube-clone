import { COMMENTS_LIST_FAIL, COMMENTS_LIST_REQUEST, COMMENTS_LIST_SUCCESS, CREATE_COMMENT_FAIL, CREATE_COMMENT_SUCCESS } from "../actionTypes";

export const getCommentsOfVideoByIdRequest = () => {
    return {
        type: COMMENTS_LIST_REQUEST,
    };
}
export const getCommentsOfVideoByIdSuccess = (data) => {
    return {
        type: COMMENTS_LIST_SUCCESS,
        payload: data.items
    };
}
export const getCommentsOfVideoByIdFail = (err) => {
    return {
        type: COMMENTS_LIST_FAIL,
        payload: err
    };
}
export const addCommentSuccess = () => {
    return {
        type: CREATE_COMMENT_SUCCESS,
    };
}
export const addCommentFail = (err) => {
    return {
        type: CREATE_COMMENT_FAIL,
        payload: err
    };
}