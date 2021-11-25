import jwt_decode from "jwt-decode";
import SprintAxios from "../apis/SprintAxios";

export const login = async function(username, password){

    const cred={
        username: username,
        password: password
    }

    try {
        const res = await SprintAxios.post('users/auth', cred);
        const decoded = jwt_decode(res.data);
        console.log(decoded.role.authority)
        window.localStorage.setItem('role', decoded.role.authority);
        window.localStorage.setItem('jwt', res.data);
    } catch (error) {
        console.log(error)
    }
    window.location.replace("/");
}

export const registration = async function(username, password, confirmPassword){

    const cred={
        username: username,
        password: password,
        confirmPassword: confirmPassword
    }

    SprintAxios.post("users", cred)
        .then(res => {
            window.location.replace("/");
        }).catch(error => {
            alert("User registration failed!");
        })
}

export const logout = function(){
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('role');
    window.location.replace("/");
}