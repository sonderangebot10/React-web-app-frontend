export const userService = {
    login,
    logout
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('/users/authenticate', requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        })
}

function handleResponse(response) {
    return response.text().then(text => {
        let data = JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                this.location.reload(true);
            }
            const error = (data) || response.statusText;
            return Promise.reject(error);
        }
        else if(data.error){
            return Promise.reject(data.error);
        }

        return data;
    });
}

function logout() {
    localStorage.removeItem('user');
}