/*eslint-disable no-native-reassign */
import React, { Component} from 'react';
import { Link, } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from "../helpers";

import { register } from '../actions/user.actions';

export class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: { username: '', password: ''},
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggedIn) {
            console.log(nextProps)
            history.push("/");
        }
    }

    handleChange = (e) => {
        // handle input change and dispatch register
        const {name, value } = e.target
        this.setState(prevState => {
            let user = Object.assign({}, prevState.user);
            user[name] = value;
            return { user };
        })
    }

    handleSubmit = (e) => {
        // handle button click and dispatch register
        e.preventDefault();
        this.props.register(this.state.user, this.props.history);
        this.setState({submitted: true});
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control username"
                            name="username"
                            onChange={this.handleChange}
                            value={user.username}
                        />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                            value={user.password}
                        />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

// complete the below function
function mapStateToProps(state) {
   return state.authentication;
}

export default connect(mapStateToProps, {register} )(RegisterPage);
