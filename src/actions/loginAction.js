import axios from 'axios';

export function usernameAction(data) {
    return {
        type: 'username_action',
        payload: {
            username: data.username
        }
    }
}

export function passwordAction(data) {
    return {
        type : 'password_action',
        payload : {
            password: data.password
        }
    }
}

export function loginFailed(){
    return {
        type: 'login_failed',
        payload: {
            loginFailed: true
        }
    }
}

export function removeFailedState() {
    return {
        type: 'remove_login_failed',
        payload : {
            loginFailed: false
        }
    }
}

export function loginSuccess() {
    return ({
        type: 'login_success',
        payload: {
            loginStatus: true
        }
    })
}

export function submitAction(){
    return (dispatch, getState) => {
        const {username, password, domain} = getState().userReducer
        axios.post(domain + 'login', {
            username,
            password
        })
        .then((response) => {
            console.log(response.request.response);
            const res = JSON.parse(response.request.response);

            if (res.status) {
                localStorage.setItem('jwttoken', res.token);
                dispatch(loginSuccess())
            } else {
                dispatch(loginFailed())
            }
          })
          .catch((err) => {
            console.log(err);
          })
    }
}

export function checkLogin() {
    return (dispatch, getState) => {
        const token = localStorage.getItem('jwttoken');
        const {domain} = getState().userReducer;
        if (token) {
            // Burada axios ile headerımıza token'ımızı koyup bir get request alarak
            // serverdan acaba tokenımızın onay alıp almayacagına bakacagız.

            const AuthStr = 'Bearer '.concat(token);
            axios.get(domain + 'getir/reactonay', {headers : { Authorization : AuthStr }})
                .then(response => {
                        if (response.data.status === 200) {
                            dispatch(loginSuccess());
                        }
                    })
                .catch(err => console.log(err))

        } else {
            console.log('token bulamadım knk')
        }
    }
}
