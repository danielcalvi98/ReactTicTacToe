import React from 'react';
import { Link } from 'react-router-dom';
import './winner.css';


function Winner({ winner }) {
    if(winner == null){
        return (
            <>
            <div className="modal-container">
                <div className="modal-header">
                    <h1 className="winner-name">Draw</h1>
                </div>      
                <div className="modal-body">
                    <Link to="/dashboard" className="btn btn-primary" >Continue</Link>
                </div> 
            </div>
            <div className="overlay"></div>
            </>
        )
    }
    return (
        <>
        <div className="modal-container">
            <div className="modal-header">
                <h1 className="winner-name">{winner} won!</h1>
            </div>      
            <div className="modal-body">
                <Link to="/dashboard" className="btn btn-primary"  >Continue</Link>
            </div> 
        </div>
        <div className="overlay"></div>
        </>
    )
    
}

export default Winner
