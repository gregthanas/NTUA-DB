import React, { Component } from 'react';
import './App.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: ''
        };
    }

    handleInputChange = (event, value) => {
        event.persist();
        const state = this.state;
        state.id = value;

        this.setState(state);
    }

    handleLogin = () => {
        const {userType} = this.props.match.params;

        localStorage.setItem(userType + 'Id', this.state.id);
        if (userType === 'employee') {
            this.props.history.push('/employee/home');
        } else {
            this.props.history.push('/home');
        }
    }

    render() {
        const {userType} = this.props.match.params;
        return (
            <div style={{textAlign: 'center'}}>
                <TextField
                    name={userType + 'Id'}
                    onChange={this.handleInputChange}
                    value={this.state.clientId}
                    floatingLabelText={'Enter ' + userType + ' id'}
                    floatingLabelFixed={true}
                />                        
                <FlatButton
                    label='Login'
                    primary={true}
                    onClick={this.handleLogin}
                />,
            </div>
        );
    }
}

export default Login;
