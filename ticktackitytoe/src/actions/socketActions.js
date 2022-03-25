import  * as constants from '../constants';

const connectSocketSuccess = userName => {
    return {
        type: constants.CONNECT_SOCKET,
        payload: io(SERVER_URL, {
            autoConnect: false,
            auth: {
                username: userName
            }
        })
    } 
}

export const connectSocket = () => {
    return (dispatch) => {
        dispatch(connectSocketSuccess(userName))
    }
}
