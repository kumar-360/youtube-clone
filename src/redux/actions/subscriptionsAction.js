import { SUBSCRIPTIONS_CHANNEL_FAIL, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS } from "../actionTypes";

export const getSubscribedChannelsRequest = () => {
    return {
        type: SUBSCRIPTIONS_CHANNEL_REQUEST,
    }
};
export const getSubscribedChannelsSuccess = (data) => {
    return {
        type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
        payload: data
    }
};
export const getSubscribedChannelsFail = (err) => {
    return {
        type: SUBSCRIPTIONS_CHANNEL_FAIL,
        payload: err
    }
};