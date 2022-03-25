import React, { Component } from 'react'
import { connect } from 'react-redux'
import './matches.css'


export class Matches extends Component {
    state = {
        matches: []
    }
    componentDidMount(){
        this.props.socket.emit('matches')
        this.props.socket.on('matches', matches => {
            this.setState({ matches });
        })
    
        this.props.socket.on('new_match', match => {
            match.winner = {}
            let { matches } = this.state;
            matches.push(match)
            this.setState({ matches })
        })

        this.props.socket.on('match_ended', (matchId, winner) => {
            let { matches } = this.state;
            let index = matches.findIndex(m => m.matchId === matchId)
            matches[index].winner = winner
            matches[index].isOngoing = false;
            this.setState({ matches })
        })

        return () => {
            this.props.socket.off('matches');
        }
    }

    isOnGoing(isOngoing) {
        return isOngoing ? 'Ongoing': 'Finished'
    }
    render() {
        const { matches } = this.state;
        return (
            <>
            <div className="matches-container" >
            <h1>Matches</h1>
                {Object.values(matches).map(m => {
                    if(m.winner == undefined) {
                        return (          
                            <div className="matches-item">
                                <p>Match status: {this.isOnGoing(m.isOngoing)}  </p>
                                <p>Players: {m.participants[0].username} VS {m.participants[1].username}</p>
                                {m.isOngoing == false &&<p>Match result: Draw</p>}
                            </div>
                        )
                    }
                    return (
                        <div className="matches-item">
                            <p>Match status: {this.isOnGoing(m.isOngoing)}  </p>
                            <p>Players: {m.participants[0].username} VS {m.participants[1].username}</p>
                            {m.isOngoing == false &&<p>Match result: {m.winner.username} won</p>}
                        </div>
                    )
                })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Matches)
