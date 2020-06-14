import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import EmployeeForm from './Employee.form.component'

export default function AddEmployee() {
  return (
        <div style={{position: "absolute",right: 0}}>
            <Modal trigger={<Button
                                icon
                                labelPosition='left'
                                color="black"
                                size='small'
                            >
                            <Icon name='user' /> Add an Employee
                            </Button>} centered={false}>
                <Modal.Header>Add an Employee</Modal.Header>
                <Modal.Content>
                    <EmployeeForm act="Add"/>
                </Modal.Content>
            </Modal>
        </div>
  );
}
