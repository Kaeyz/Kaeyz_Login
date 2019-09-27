import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout } from "../actions/user.actions";

class HomePage extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2 align="center">Welcome! You have successfully logged in.</h2>
                <p align="center">
                    {/* Add a redirection for logout */}
                    <button className="btn btn-light" onClick={this.onLogoutClick.bind(this)}>Logout</button>
                </p>
            </div>
        );
    }
}



export default connect(null, { logout })(HomePage);