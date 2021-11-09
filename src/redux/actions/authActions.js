import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "../actionTypes"

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
};
export const login = (userInfo) => {
    return {
        type: LOGIN_SUCCESS,
        payload: userInfo
    }
};
export const loginFail = (err) => {
    return {
        type: LOGIN_FAIL,
        payload: err
    }
};
export const logout = () => {
    return {
        type: LOG_OUT
    }
};