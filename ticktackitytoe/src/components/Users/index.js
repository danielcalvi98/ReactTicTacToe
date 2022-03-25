import React from 'react'
import { useSelector } from 'react-redux';

function Users( {users} ) {

    const socket = useSelector(state => state.socketReducer.socket)
    function isConnected(connected)  {
        return connected ? 'connected' : 'disconnected';
    }
    function challenge(user) {
        if(user.connected) {
            socket.emit('game_challenge', user.userID);
            return;
        }
        alert('disconnected')
    }
    return (
        <div>
            <h1>Users</h1>
            { Object.values(users).map(u => (
                <div>{ u !== undefined && <>
                    <h4 className="username">{u.username}</h4>
                    <p className="connection-status">Connection status: {isConnected(u.connected)}</p>
                    <button className="btn btn-primary" onClick={ () => challenge(u) } >Challenge</button>
                    </>
                    }
                </div>      
            )) }
        </div>
    )
}
export default Users
