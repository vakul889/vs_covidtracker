import {FETCH_TRACKER_DATA, FETCH_TRACKER_STATE_DATA, FETCH_TRACKER_STATE_CITY_DATA} from './types';

export const fetchTrackerData = data => dispatch => {
        //data = require('../Static/totaldata.json')
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(process.env.REACT_APP_API_HOST+"/api/country_data", requestOptions)
        .then(response => response.json())
        .then(result => {
            data = result
            dispatch({
                type: FETCH_TRACKER_DATA,
                payload: data
            })
        })
        .catch(error => console.log('error', error));
        
}

export const fetchTrackerStateData = data => dispatch => {
    //data = require('../Static/statedata.json')
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(process.env.REACT_APP_API_HOST+"/api/state_data", requestOptions)
        .then(response => response.json())
        .then(result => {
            data = result.sort((a,b)=>{
                return a.confirmed > b.confirmed
            })
            dispatch({
                type: FETCH_TRACKER_STATE_DATA,
                payload: data
            })
        })
        .catch(error => console.log('error', error));
   
    
}

export const fetchTrackerStateCityData = data => dispatch => {
    //data = require('../Static/statecitydata.json')
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(process.env.REACT_APP_API_HOST+"/api/city_data", requestOptions)
        .then(response => response.json())
        .then(result => {
            data = result.sort((a,b)=>{
                return a.confirmed > b.confirmed
            })
            dispatch({
                type: FETCH_TRACKER_STATE_CITY_DATA,
                payload: data
            })
        })
        .catch(error => console.log('error', error));
}