import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../actionTypes";

export const getChannelDetailsRequest = () => {
    return {
        type: CHANNEL_DETAILS_REQUEST,
    };
}
export const getChannelDetailsSuccess = (id) => {
    return {
        type: CHANNEL_DETAILS_SUCCESS,
        payload: id
    };
}
export const getChannelDetailsFail = (err) => {
    return {
        type: CHANNEL_DETAILS_FAIL,
        payload: err
    };
}
export const checkSubscriptionStatus = (data) => {
    return {
        type: SET_SUBSCRIPTION_STATUS,
        payload: data.items.length !== 0
    }
}
