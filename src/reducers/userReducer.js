const initialState = {
    username : '',
    password : '',
    domain: 'http://68.183.72.124/',
    loginStatus : false,
    loginFailed: false
}

function userReducer(state=initialState, {type, payload}) {
    switch(type) {
        case 'username_action':
            return {...state, username: payload.username}
        case 'password_action':
            return {...state, password: payload.password}
        case 'login_failed':
            return {...state, username: '', password: '', loginFailed: payload.loginFailed} // geri dönüldüğünde username ve password alanı boş olacak.
        case 'remove_login_failed':
            return {...state, loginFailed: payload.loginFailed}
        case 'login_success':
            return {...state, loginStatus: payload.loginStatus}
        default:
            return state;
    }
}

export default userReducer;
