import React from 'react';
import './notfound.css';

function Notfound() {
    return (
        <div className="notfound-container" >
            <img src="https://lh6.googleusercontent.com/proxy/a4N0RiwELCVb3PfZwTkW3oorbvlseay4G95WUgml2uUAgh6HamYa4LevWj9AVRGVFd0=s0-d" alt="Not Found Img" className="notfound-img"/>
            <h1 className="notfound-title" >404</h1>
            <p className="notfound-text" >Page Not found!</p>   
        </div>
    )
}
export default Notfound
