//evaluate any actions that are commited
import {FETCH_MANAGER, CREATE_MANAGER} from '../Actions/types';

const initialState = {
    manager: {}
}

export default function(state = initialState, action){
    switch (action.type) {
        case FETCH_MANAGER:
            console.log("reducer")
            console.log(action.payload)
            return{
                ...state,
                manager: action.payload
            }
        case CREATE_MANAGER:
            console.log("reducer")
            console.log(action.payload)
            return{
                ...state,
                manager: action.payload
            }
        default:
            return state;
    }
}