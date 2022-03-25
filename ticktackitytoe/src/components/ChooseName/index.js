import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Filter from 'bad-words';
import Form from '../Form';
import Input from '../Input';
import { connectUser } from '../../actions/usersActions'
import './chooseName.css';

export class ChooseName extends Component {
    state = {
        name: '',
        errors: {
            nameError: '',
        },
    }

    validateForm() {
        var filter = new Filter();
        const errors = {};
        if(this.state.name === '') { errors.nameError = 'Nickname is required!'; }

        if(filter.isProfane(this.state.name)) { errors.nameError = 'That nickname is inappropriate, try to keep it pc please.' }

        if (Object.keys(errors).length > 0) {
            this.setState({ ...this.state.errors, errors });
            return false;
        };
        return true;
    }

    handleTextChange = e => {
        const {target: { name, value }} = e;
        this.setState({ [name]: value });
    }

    handleOnSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        this.props.socket.on('connect_error', (err) => {
            if(err.message === 'occupied') errors.nameError = 'That nickname is taken!';
            this.setState({ ...this.state.errors, errors });
            return;
        })
        if(!this.validateForm()) {
            return;
        }
        else {
            this.props.socket.auth = {username: this.state.name}
            this.props.socket.connect()
            this.props.socket.on('session', session => {
                localStorage.setItem('session', JSON.stringify(session))
                this.props.history.push("/dashboard");
            })                     
        }
    }

    render() {        
        const { name } = this.state;
        const { nameError } = this.state.errors
        return (
            <div className="form-container" >
                <Form onSubmit={ e => (this.handleOnSubmit(e)) } >
                    <Input
                        type= "text"
                        value= { name }
                        name= "name"
                        htmlId= "name"
                        label="Enter Nickname"
                        errorMessage={ nameError }
                        onInput={ e => this.handleTextChange(e) }/>
                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-primary" />
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    socket: state.socketReducer.socket,
})

export default withRouter(connect(mapStateToProps, {connectUser})(ChooseName))