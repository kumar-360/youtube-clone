import { SUBSCRIPTIONS_CHANNEL_FAIL, SUBSCRIPTIONS_CHANNEL_REQUEST, SUBSCRIPTIONS_CHANNEL_SUCCESS } from "../actionTypes"

const initialState = {
    loading: false,
    channels: null,
    error: null
}

export const subscribedChannelsReducer = (prevState = initialState, { type, payload }) => {
    switch (type) {
        case SUBSCRIPTIONS_CHANNEL_REQUEST:
            return {
                ...prevState,
                loading: true,
            }
        case SUBSCRIPTIONS_CHANNEL_SUCCESS:
            return {
                ...prevState,
                loading: false,
                channels: payload
            }
        case SUBSCRIPTIONS_CHANNEL_FAIL:
            return {
                ...prevState,
                loading: false,
                error: payload
            }
        default:
            return prevState;
    }
}