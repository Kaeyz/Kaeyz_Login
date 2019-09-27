export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    // call `/users/authenticate` with requestOptions to authenticate the login process
    return fetch('/users/authenticate', requestOptions)
        .then(handleResponse)
        .then(res => {
            localStorage.setItem("user", res.username)
            return Promise.resolve(res);
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user")
    return Promise.resolve({});
}


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/register', requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
