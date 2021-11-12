import { COMMENTS_LIST_FAIL, COMMENTS_LIST_REQUEST, COMMENTS_LIST_SUCCESS, CREATE_COMMENT_FAIL, CREATE_COMMENT_SUCCESS } from "../actionTypes";

const initialState = {
    loading: false,
    comments: null
};

export const commentsListReducer = (prevState = initialState, { type, payload }) => {
    switch (type) {
        case COMMENTS_LIST_REQUEST:
            return {
                ...prevState,
                loading: true,
            }
        case COMMENTS_LIST_SUCCESS:
            return {
                ...prevState,
                loading: false,
                comments: payload
            }
        case COMMENTS_LIST_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }
        case CREATE_COMMENT_SUCCESS:
            return prevState;
        case CREATE_COMMENT_FAIL:
            return {
                ...prevState,
                error: payload
            }
        default:
            return prevState;
    }
}