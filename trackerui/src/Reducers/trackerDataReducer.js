//evaluate any actions that are commited
import {FETCH_TRACKER_DATA, FETCH_TRACKER_STATE_DATA,FETCH_TRACKER_STATE_CITY_DATA} from '../Actions/types';

const initialState = {
    trackerData: {},
    trackerStateData: [],
    trackerStateCityData: []
}

export default function(state = initialState, action){
    switch (action.type) {
        case FETCH_TRACKER_DATA:
            console.log("Tracker Data Reducer")
            console.log(action.payload)
            return{
                ...state,
                trackerData: action.payload
            }
        case FETCH_TRACKER_STATE_DATA:
            console.log("Tracker State Data Reducer")
            console.log(action.payload)
            return{
                ...state,
                trackerStateData: action.payload
            }
        case FETCH_TRACKER_STATE_CITY_DATA:
            console.log("Tracker State City Data Reducer")
            console.log(action.payload)
            return{
                ...state,
                trackerStateCityData: action.payload
            }
        default:
            return state;
    }
}