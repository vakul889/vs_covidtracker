import {FETCH_USER, CREATE_USER} from './types';

export const fetchUser = data => dispatch => {
        var finalresult = {
            severity: "",
            message: ""
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(data);
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        fetch(process.env.REACT_APP_API_HOST+"/api/validate", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result.result ==="SUCCESS"){
                        var decodedString = atob(result.auth);
                        if(decodedString.split("|")[0] === data.email){
                            finalresult.severity = "success";
                            finalresult.message = "You are now logging in. Please wait..."
                            window.localStorage.setItem("username",decodedString.split("|")[1]);
                            window.localStorage.setItem("redirect","/CovidTracker/");
                        } else {
                            finalresult.severity = "error";
                            finalresult.message = "Invalid Username/Credenials. User Not Found."
                        }
                    }else if(result.result ==="USER NOT FOUND"){
                        finalresult.severity = "error";
                        finalresult.message = "Invalid Username/Credenials. User Not Found."
                    }else if(result.result ==="UNKNOWN ERROR OCCURED"){
                        finalresult.severity = "error";
                        finalresult.message = "Unknown Server Error.Please Try Again Later."
                    }
                    window.localStorage.setItem("severity",finalresult.severity);
                    window.localStorage.setItem("message",finalresult.message);
                })
                .catch(error => { 
                    finalresult.severity = "error";
                    finalresult.message = "Server connection error.Please Try Again Later."
                    window.localStorage.setItem("severity",finalresult.severity);
                    window.localStorage.setItem("message",finalresult.message);
                    console.log('error', error)
                });    
            dispatch({
                type: FETCH_USER,
                payload: finalresult
            })
                            
}

export const addUser = data => dispatch => {
        var finalresult = {
            severity: "",
            message: ""
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(data);
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        fetch(process.env.REACT_APP_API_HOST+"/api/user", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result.result ==="USER ADDED"){
                        finalresult.severity = "success";
                        finalresult.message = "Email Id "+data.email+" has been successfully added. Proceed to Login..."
                    }else if(result.result ==="USER ALREADY EXISTS"){
                        finalresult.severity = "warning";
                        finalresult.message = "Email Id "+data.email+" is already registered."
                    }
                    window.localStorage.setItem("severity",finalresult.severity);
                    window.localStorage.setItem("message",finalresult.message);
                })
                .catch(error => { 
                    finalresult.severity = "error";
                    finalresult.message = "Server connection error.Please Try Again Later."
                    window.localStorage.setItem("severity",finalresult.severity);
                    window.localStorage.setItem("message",finalresult.message);
                    console.log('error', error)
                });
            dispatch({
                type: CREATE_USER,
                payload: finalresult
            })
}