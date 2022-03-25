import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import PlayerPawn from '../PlayerPawn';
import Winner from '../Winner';
import './board.css';

export class Board extends Component {
    state = {
        matchId: '',
        board: ['','','','','','','','',''],
        x_o: '',
        turn: 'X',
        matchEnded: false,
        winner: '',
        moves: 0
    }

    componentDidMount() {
        if(JSON.parse(localStorage.getItem('board')) == null) {
            localStorage.setItem('board', JSON.stringify(this.state))
        }
        this.setState(JSON.parse(localStorage.getItem('board')))
        const sesh = JSON.parse(localStorage.getItem('session'))
        this.props.socket.auth = { sessionID: sesh.sessionID }
        this.props.socket.connect()
        let matchId = this.props.match.params.id
        this.setState({ matchId })
        this.props.socket.emit('ready', this.props.match.params.id);
        this.props.socket.on('assign_symbol', symbol => {
            let { x_o } = this.state;
            x_o = symbol;
            this.setState({ x_o })
        })

        this.props.socket.on('game_move', (symbol, idx) => {
            let { board, turn, moves } = this.state;
            board[idx] = symbol;
            turn === 'X'? turn = 'O': turn = 'X';
            this.setState({ board, turn, moves })
            localStorage.setItem('board', JSON.stringify(this.state))
        });

        this.props.socket.on('match_ended', (matchId, winner) => {
            let currMatchId = this.props.match.params.id;
            if(currMatchId !== matchId) return;
            if(winner == null){
                this.setState( {winner: null} )
                return;
            }
            this.setState( {winner: winner.username} )
        })
    }

    gameMove(i) {
        let { matchId, board, x_o, turn, matchEnded, moves } = this.state;
        if(turn !== x_o) return;
        if(board[i] !== '') return;
        if(matchEnded) return;
        board[i] = x_o;
        moves += 1;
        let winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < winningCombos.length; i++) {
            let row = winningCombos[i];
            let p1 = row[0];
            let p2 = row[1];
            let p3 = row[2];
            if(board[p1]!==''){
                if (board[p1] == board[p2] && board[p2] == board[p3] && board[p3] == board[p1]) {
                    matchEnded = true;
                }
            }
        }
        this.setState({ board, matchEnded, moves })
        if (moves === 5 && matchEnded == false) {
            this.props.socket.emit('game_move', matchId, x_o, i, true,true)
            return;
        }
        this.props.socket.emit('game_move', matchId, x_o, i, matchEnded)
    }

    render() {
        let { winner, board, x_o } = this.state;
        return (
            <>
            <PlayerPawn symbol={x_o} />
            <div className="board-container">
                <div className="board">
                    { board.map((cell, i) => (
                        <div className="cell" onClick={ () => this.gameMove(i) }>
                            {cell !== '' && <img className="symbol" src = { `/img/${cell}.png` } />}
                        </div>
                    )) }
                </div>
                {
                    winner !== '' &&
                    <Winner winner = { winner } />
                    }
            </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    socket: state.socketReducer.socket,
})

const mapDispatchToProps = { 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))