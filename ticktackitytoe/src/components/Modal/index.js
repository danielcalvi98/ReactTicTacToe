import React from 'react'
import './modal.css'

function Modal({ user, acceptHandler, declineHandler }) {
    if(user) {
        var username = user.username;
    }
    return (
        <> 
            <div className="modal-container" >
                <div className="modal-header">
                    <h3>Game Invite From { username }</h3>
                </div>
                <div className="modal-body">
                    <button className="btn btn-primary" onClick={ acceptHandler } >Accept</button>
                    <button className="btn btn-primary" onClick={ declineHandler } >Decline</button>
                </div> 
            </div>
            <div className="overlay"></div>
        </>
    )
}

export default Modal
