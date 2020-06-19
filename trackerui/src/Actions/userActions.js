import {FETCH_USER, CREATE_USER} from './types';

export const fetchUser = data => dispatch => {
            console.log("fetching")
            // var getApi = 'http://localhost:8080/v1/users'
            // fetch(getApi)
            //     .then(response => response.json())
            //     .then(data => dispatch({
            //         type: FETCH_MANAGER,
            //         payload: data,
            //     }))
            //     .catch(error => console.log(error));   
            var users = require('../Static/users.json')
            var found = false;
            users.map(usr => {
                        if(usr.email===data.email && usr.password===data.password){
                            found=true;
                            dispatch({
                                type: FETCH_USER,
                                payload: usr
                            })
                            localStorage.setItem("username", usr.firstname)
                            window.location.href = "/CovidTracker";
                        }
                        return found;
                    })
            if(found===false){
                alert("User not found");
            }
}

export const addUser = data => dispatch => {
    alert("User added")
    console.log(data)
        dispatch({
            type: CREATE_USER,
            payload: data
        })
        window.location.href = "/CovidTracker";
}