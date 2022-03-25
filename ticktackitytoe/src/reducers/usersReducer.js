import * as constants from '../constants';

const initialState = {
    users: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case constants.LOAD_USERS:
        return {
            
            ...state,
            users: payload
        }

    case constants.USER_CONNECT:
        return {
            ...state,
            users: payload
        }
    case constants.USER_DISCONNECT:
        return {
            ...state,

        }

    
    default:
        return state
    }
}
