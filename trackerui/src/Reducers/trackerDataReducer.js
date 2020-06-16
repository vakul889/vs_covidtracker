//evaluate any actions that are commited
import {FETCH_TRCKER_DATA} from '../Actions/types';

const initialState = {
    trackerData: []
}

export default function(state = initialState, action){
    switch (action.type) {
        case FETCH_TRCKER_DATA:
            console.log("reducer")
            console.log(action.payload)
            return{
                ...state,
                trackerData: action.payload
            }
        default:
            return state;
    }
}