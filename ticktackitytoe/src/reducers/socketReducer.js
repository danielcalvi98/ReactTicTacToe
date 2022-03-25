import io from 'socket.io-client';
import { SERVER_URL } from '../constants';

const initialState = {
    socket: io(SERVER_URL, {
        autoConnect: false
    }), 
}

export default function(state = initialState, action ) {
    return state;
}