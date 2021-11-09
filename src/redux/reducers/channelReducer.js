import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../actionTypes";

const initialState = {
    loading: false,
    channel: null,
    error: null,
    subscriptionStatus: false
};

export const channelDetailsReducer = (prevState = initialState, { type, payload }) => {
    switch (type) {
        case CHANNEL_DETAILS_REQUEST:
            return {
                ...prevState,
                loading: true,
            }
        case CHANNEL_DETAILS_SUCCESS:
            return {
                ...prevState,
                loading: false,
                channel: payload
            }
        case CHANNEL_DETAILS_FAIL:
            return {
                ...prevState,
                loading: false,
                channel: null,
                error: payload
            }
        case SET_SUBSCRIPTION_STATUS:
            return {
                ...prevState,
                subscriptionStatus: payload
            }
        default:
            return prevState;
    }
}