import {FETCH_ALL_EMPLOYEES, CREATE_EMPLOYEE, EDIT_EMPLOYEE, DELETE_EMPLOYEE} from '../Actions/types';
//import axios from 'axios'

export const fetchAllEmployees = () => dispatch => {
            // console.log("fetching")
            // var getApi = 'http://localhost:8081/mgrportal/employee'
            // fetch(getApi)
            //     .then(response => response.json())
            //     .then(data => dispatch({
            //         type: FETCH_ALL_EMPLOYEES,
            //         payload: data,
            //     }))
            //     .catch(error => console.log(error));   
}

export const addEmployee = data => dispatch => {
        // alert("New Employee Added")
        // const headers = new Headers();
        // headers.append('Content-Type','application/json');
        // let url = 'http://localhost:8081/mgrportal/employee'
        // const options = {
        //     method:'POST',
        //     data,
        //     url
        // }
        // axios(options).then(response => response.json())
        //             .then(data => dispatch({
        //                 type: CREATE_EMPLOYEE,
        //                 payload: data,
        //             }))
        //             .catch(error => console.log(error));   
        //     window.location.href = "/homepage";
}

export const editEmployee = data => dispatch => {
    // alert("Employee Details Edited")
    // const headers = new Headers();
    //     headers.append('Content-Type','application/json');
    //     let url = 'http://localhost:8081/mgrportal/employee'
    //     const options = {
    //         method:'PUT',
    //         data,
    //         url
    //     }
    //     axios(options).then(response => response.json())
    //                 .then(data => dispatch({
    //                     type: EDIT_EMPLOYEE,
    //                     payload: data,
    //                 }))
    //                 .catch(error => console.log(error));
    //     window.location.href = "/homepage";
}

export const deleteEmployee = data => dispatch => {
    // const headers = new Headers();
    //     headers.append('Content-Type','application/json');
    //     let url = 'http://localhost:8081/mgrportal/employee/'+data
    //     const options = {
    //         method:'DELETE',
    //         url
    //     }
    //     axios(options).then(response => response.json())
    //                 .then(alert("Employee Deleted"))
    //                 .catch(error => console.log(error));
    // window.location.href = "/homepage";
}