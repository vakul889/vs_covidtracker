import React from 'react';
import { Card, Image, List, Icon } from 'semantic-ui-react';
import EditEmployee from './EditEmployee.component';
import {deleteEmployee} from '../Actions/employeeActions'
import { connect } from 'react-redux';

function EmployeeCard({emp,...props}) {
  return (
    <Card style={{width: "100%"}}> 
        <Card.Content>
            <Image floated="right">
              <div style={{display: "flex"}}>
                <EditEmployee employee={emp}/>
                <Icon style={{cursor: "pointer"}} name="remove" size="large" onClick={() => props.deleteEmployee(emp.id)}/>
              </div>
            </Image>
            <Card.Header>{emp.firstname}</Card.Header>
            <Card.Meta>{emp.lastname}</Card.Meta>
            <br/>
            <Card.Description>
            <List celled horizontal>
                <List.Item>Address: {emp.address}</List.Item>
                <List.Item>Date of birth: {emp.dob}</List.Item>
                <List.Item>City: {emp.city}</List.Item>
                <List.Item>Mobile: {emp.mobile}</List.Item>
            </List>
            </Card.Description>
        </Card.Content>
    </Card>
  );
}

export default connect(null, {deleteEmployee})(EmployeeCard)