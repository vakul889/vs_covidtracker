//evaluate any actions that are commited
import {FETCH_ALL_EMPLOYEES, CREATE_EMPLOYEE,EDIT_EMPLOYEE,DELETE_EMPLOYEE} from '../Actions/types';

const initialState = {
    employees: [],
    employee: {}
}

export default function(state = initialState, action){
    switch (action.type) {
        case FETCH_ALL_EMPLOYEES:
            console.log("Fetch reducer")
            return{
                ...state,
                employees: action.payload
            }
        case CREATE_EMPLOYEE:
            console.log("Create reducer")
            return{
                ...state,
                employee: action.payload
            }
        case EDIT_EMPLOYEE:
        console.log("Edit reducer")
        return{
            ...state,
            employee: action.payload
        }
        case DELETE_EMPLOYEE:
        console.log("Delete reducer")
        return{
            ...state,
            employee: action.payload
        }
        default:
            return state;
    }
}