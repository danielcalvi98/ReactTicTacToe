import React from 'react';
import { useHistory } from "react-router-dom";
import ChooseName from '../ChooseName'
import './home.css'

function Home() {
    const sesh = JSON.parse(localStorage.getItem('session'));
    let history = useHistory();
    if(sesh) history.push('/dashboard');
    return (
        <div className="home-container" >
            <h1 className="home-title">Tic Tackity Toe</h1>
            <ChooseName />
        </div>
    )
}

export default Home
