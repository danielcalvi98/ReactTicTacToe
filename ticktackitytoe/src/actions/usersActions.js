import * as constants from "../constants";


export const loadUsers = (payload) => ({
    type: constants.LOAD_USERS,
    payload
})

export const connectUser = (payload) => ({
    type: constants.USER_CONNECT,
    payload
})


export const disConnectUser = (payload) => ({
    type: constants.USER_DISCONNECT,
    payload
})
