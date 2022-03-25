import React, { Component } from 'react'
import { connect } from 'react-redux'
import Board from '../Board'
import Navbar from '../Navbar'
import './match.css'

export class Match extends Component {
    state = {
        matches: [],
        user: ''
    }
    componentDidMount() {
        this.props.socket.emit('matches')
        this.props.socket.on('matches', matches => {
            console.log('user in match',matches)
            this.setState({ matches });
        })   
    }
    render() {
        const sesh = JSON.parse(localStorage.getItem('session'))
        console.log(sesh)
        if (sesh == null ) { 
            this.props.history.push('/dashboard')
            return(<></>)
        }
        return (
            <>
            <Navbar />
            <div className="match-container">
                <Board />
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

export default connect(mapStateToProps, mapDispatchToProps)(Match)
