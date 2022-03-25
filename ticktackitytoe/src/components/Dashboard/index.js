import React from 'react'
import { connect } from 'react-redux';
import { loadUsers ,connectUser } from '../../actions/usersActions'
import Navbar from '../Navbar';
import Modal from '../Modal';
import { v4 as uuidv4 } from 'uuid';
import Matches from '../Matches';
import './dashboard.css'
import Users from '../Users';

export class Dashboard extends React.Component {
    state = {
        users: [],
        isChallenged: false,
        challenger: ''
    }
    componentDidMount() {
        localStorage.removeItem('board')
        const sesh = JSON.parse(localStorage.getItem('session'))
        if(sesh == null) return;
        this.props.socket.off('users')
        this.props.socket.off('connected_user')
        this.props.socket.off('disconnected_user')
        this.props.socket.off('user_left')
        this.props.socket.off('game_challenge')
        this.props.socket.off('game_challenge_accepted')
        this.props.socket.off('game_challenge_declined')
        this.props.socket.auth = { sessionID: sesh.sessionID }
        this.props.socket.connect()
        this.props.socket.emit('users')
        this.props.socket.on('users', users => {
            this.setState({ users });
            this.props.loadUsers(users)
        })

        this.props.socket.on('game_challenge', gameChallengeObject => {
            this.setState({ isChallenged: true, challenger: gameChallengeObject });
        })

        this.props.socket.on('connected_user', user => {
            this.props.socket.emit('users')
            this.props.socket.on('users', users => {
                this.setState({ users });
                this.props.loadUsers(users)
            })
        })

        this.props.socket.on('disconnected_user', userId => {
            let { users } = this.state;
            let index = users.findIndex(u => u.userID === userId)
            if(users[index] !== undefined) {
                users[index].connected = false;
            }
            this.setState({users});
        })

        this.props.socket.on('user_left', userId => {
            let users = this.state.users;
            users = users.filter(u => u.userID !== userId)
            this.setState({users});
        })

        this.props.socket.once('game_challenge_accepted', (matchId, fromUser) => {
            alert(`${fromUser.username} Accepted Your Game Challenge`)
            this.props.history.push(`/match/${matchId}`);
        })

        this.props.socket.on('game_challenge_declined', fromUser => {
            alert(`${fromUser.username} Declined Your Game Challenge`)
        })
        return () => {
            this.props.socket.off('users')
            this.props.socket.off('connected_user')
            this.props.socket.off('disconnected_user')
            this.props.socket.off('user_left')
            this.props.socket.off('game_challenge')
            this.props.socket.off('game_challenge_accepted')
            this.props.socket.off('game_challenge_declined')
        }
    }

    accept() {
        let matchId = uuidv4();
        this.props.socket.emit('game_challenge_accepted', matchId, this.state.challenger.challenger.userID);
        this.props.history.push(`/match/${matchId}`) ;
    }

    decline() {
        this.props.socket.emit('game_challenge_declined', this.state.challenger.challenger.userID);
        let isChallenged = this.state.isChallenged;
        isChallenged = false;
        this.setState({isChallenged})
    }

    render() {
        const { isChallenged, challenger, users } = this.state;
        return (
            <div>
                <Navbar />
                <div className="dashboard-container" >
                    {isChallenged &&
                        <Modal 
                            user={challenger.challenger}
                            acceptHandler={ () => this.accept() }
                            declineHandler={ () => this.decline() } /> }
                    <div className="dashboard-users">
                        <Users users ={ users } />
                    </div>
                    <Matches />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    socket: state.socketReducer.socket,
    users: state.usersReducer.users
})


export default connect(mapStateToProps, {loadUsers,connectUser})(Dashboard)
