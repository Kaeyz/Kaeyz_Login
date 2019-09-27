import React from 'react';
import { Router, Route, Switch  } from 'react-router-dom';
import {PrivateRoute} from './PrivateRoute.js';
import { connect } from 'react-redux';
import { history } from './helpers';
//import { alertActions } from './actions';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

class App extends React.Component {
      constructor(props) {
        super(props);

        const { dispatch } = this.props;
         history.listen((location, action) => {
             console.log(location, action, dispatch);
        });
    }

    renderAlert(alert) {
        if (alert) {
            return (
                <div className={`alert ${alert.type}`} role="alert">
                    {alert.message}
                </div>
            )
        };
    };

    render() {
        const { alert } = this.props;
        return (
            <Router history={history}>
                <div className="container">
                    {alert && this.renderAlert(alert)}
                    <div className="col-sm-8 col-sm-offset-2">
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                        </Switch>
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/login" component={LoginPage} />
                    </div>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {alert};
}

export default connect(mapStateToProps)(App);