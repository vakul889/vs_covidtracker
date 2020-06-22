import {FETCH_TRACKER_DATA, FETCH_TRACKER_STATE_DATA, FETCH_TRACKER_STATE_CITY_DATA} from './types';

export const fetchTrackerData = data => dispatch => {
        data = require('../Static/totaldata.json')
        dispatch({
            type: FETCH_TRACKER_DATA,
            payload: data
        })
}

export const fetchTrackerStateData = data => dispatch => {
    data = require('../Static/statedata.json')
    data = data.sort((a,b)=>{
        return a.confirmed > b.confirmed
    })
    dispatch({
        type: FETCH_TRACKER_STATE_DATA,
        payload: data
    })
}

export const fetchTrackerStateCityData = data => dispatch => {
    data = require('../Static/statecitydata.json')
    dispatch({
        type: FETCH_TRACKER_STATE_CITY_DATA,
        payload: data
    })
}