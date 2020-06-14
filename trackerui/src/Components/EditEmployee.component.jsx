import React from 'react';
import { Icon, Modal } from 'semantic-ui-react';
import EmployeeForm from './Employee.form.component'

export default function EditEmployee({employee}) {
  return (
        <div>
            <Modal trigger={<Icon style={{cursor: "pointer"}} name="pencil" size="large" />} centered={false}>
                <Modal.Header>Edit Details for "{employee.firstname} {employee.lastname}"</Modal.Header>
                <Modal.Content>
                    <EmployeeForm act="Edit" singleEmp={employee}/>
                </Modal.Content>
            </Modal>
        </div>
  );
}
