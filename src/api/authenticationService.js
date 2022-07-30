import axios from 'axios';


const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userLogin=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/auth/login`,
        data:authRequest
    })
}

export const fetchUserData=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/user/panel`,
        headers:{
            'Authorization':'Bearer '+ getToken()
        }
    })
}

export const logout=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8081'}/api/v1/user/logout`,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    });
}