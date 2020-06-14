import React, { Component } from 'react'
import {  Card } from 'semantic-ui-react'
import EmployeeCard from './Employee.Card.component'
import PropTypes from 'prop-types'
import AddEmployee from './AddEmployee.component'
import { connect } from "react-redux";
import {fetchAllEmployees} from '../Actions/employeeActions'

class EmployeeCardsList extends Component {
    componentDidMount(){
        this.props.fetchAllEmployees()
    }

    render(){
        return(
            <React.Fragment>
                <AddEmployee/>
                <Card.Group style={{marginTop: '50px'}}>
                    {this.props.employees.map(emp => 
                        <EmployeeCard key={emp.id} emp={emp}/>    
                    )}
                </Card.Group>
            </React.Fragment>
        )
    }  
}

EmployeeCardsList.propTypes = {
    fetchAllEmployees: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    employees: state.employees.employees
})

export default connect(mapStateToProps, {fetchAllEmployees})(EmployeeCardsList);