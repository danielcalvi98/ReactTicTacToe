import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
import usersReducer from './usersReducer';
import boardReducer from './boardReducer';

export default combineReducers({
    socketReducer,
    usersReducer,
    boardReducer
});