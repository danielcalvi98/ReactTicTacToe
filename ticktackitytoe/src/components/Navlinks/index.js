import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import{ useSelector } from 'react-redux';
import './navbar.css'
function leave(socket) {
    socket.emit('leave')
    socket.off('leave')
    socket.disconnect();
    localStorage.clear()
}

const Navlinks = () => {
    const socket = useSelector(state => state.socketReducer.socket)
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('session'))
    if(user == null) {
        history.push('/'); 
        return (<></>)
    }
    return (
        <div className="navbar-container" >
            <nav className="navbar">
                <ul className="navbar-items">
                    <h1>{user.username}</h1>
                    <Link to="/" onClick={ () => leave(socket) } className="btn btn-primary">Leave</Link>
                </ul>
            </nav>
        </div>
    )
}

export default Navlinks;
