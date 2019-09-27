import { userConstants} from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';


export const login = (user) => dispatchEvent => {
    // return the promise using fetch which adds to localstorage on resolve
    dispatchEvent(alertActions.clear());
    dispatchEvent(request(user));
    const { username, password } = user;
    userService.login(username, password)
        .then(res => {
            dispatchEvent(success(res.username));
        })
        .catch(err => {
            dispatchEvent(failure(err));
            dispatchEvent(alertActions.error(err));
        });

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

export const logout = () => dispatchEvent => {
    // complete this function
    userService.logout()
        .then(() => {
            dispatchEvent(success())
            history.push("login");
    })
    function success() { return { type: userConstants.LOGOUT} }
};

export const register = (user) => dispatchEvent => {
    // return the promise using fetch which dispatches appropriately
    dispatchEvent(alertActions.clear());
    dispatchEvent(request(user));
    userService.register(user)
        .then(() => {
            dispatchEvent(success(user));
            dispatchEvent(alertActions.success("Registration Successful"));
            history.push("/login");
        })
        .catch(err => {
            dispatchEvent(failure(err));
            dispatchEvent(alertActions.error(err));
        });

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


