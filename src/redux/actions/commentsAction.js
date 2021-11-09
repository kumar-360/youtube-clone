import { COMMENTS_LIST_FAIL, COMMENTS_LIST_REQUEST, COMMENTS_LIST_SUCCESS } from "../actionTypes";

export const getCommentsOfVideoByIdRequest = () => {
    return {
        type: COMMENTS_LIST_REQUEST,
    };
}
export const getCommentsOfVideoByIdSuccess = (id) => {
    return {
        type: COMMENTS_LIST_SUCCESS,
        payload: id
    };
}
export const getCommentsOfVideoByIdFail = (err) => {
    return {
        type: COMMENTS_LIST_FAIL,
        payload: err
    };
}