//evaluate any actions that are commited
import {FETCH_USER, CREATE_USER} from '../Actions/types';

const initialState = {
    user: {}
}

export default function(state = initialState, action){
    switch (action.type) {
        case FETCH_USER:
            // console.log("reducer")
            // console.log(action.payload)
            return{
                ...state,
                user: action.payload
            }
        case CREATE_USER:
            // console.log("Create user reducer")
            // console.log(action.payload)
            return{
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}