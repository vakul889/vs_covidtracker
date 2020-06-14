import {FETCH_MANAGER, CREATE_MANAGER} from '../Actions/types';

export const fetchManager = data => dispatch => {
            console.log("fetching")
            // var getApi = 'http://localhost:8080/atao/atao-rest-service/Postings/requisitions?applicationName=ScoringIncdsiCA'
            // fetch(getApi)
            //     .then(response => response.json())
            //     .then(data => dispatch({
            //         type: FETCH_MANAGER,
            //         payload: data,
            //     }))
            //     .catch(error => console.log(error));   
            var managers = require('../Static/manager.json')
            var found = false;
            managers.map(mgr => {
                        if(mgr.email===data.email && mgr.password===data.password){
                            found=true;
                            dispatch({
                                type: FETCH_MANAGER,
                                payload: mgr
                            })
                            localStorage.setItem("username", mgr.firstname)
                            window.location.href = "/homepage";
                        }   
                    })
            if(found===false){
                alert("Manager entry not found");
            }
}

export const addManager = data => dispatch => {
    alert("Manager added")
    console.log(data)
        dispatch({
            type: CREATE_MANAGER,
            payload: data
        })
        window.location.href = "/homepage";
}