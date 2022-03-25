import React from 'react'
import './player.css'

function PlayerPawn({symbol}) {
    return (
        <div className="player">
            <h2 className="player-pawn">Pawn</h2>
            <img className="player-symbol" src = { `/img/${symbol}.png` } />
        </div>
    )
}
export default PlayerPawn
