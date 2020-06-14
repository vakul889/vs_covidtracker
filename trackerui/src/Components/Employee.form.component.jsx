import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {addEmployee, editEmployee} from '../Actions/employeeActions'

class EmployeeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            address: '',
            city: '',
            dob: '',
            firstname: '',
            lastname: '',
            mobile: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('A name was submitted: ' + this.state.firstname + this.state.lastname);
        if(this.state.firstname != ''){
            const data = {
                id: this.state.id,
                address: this.state.address,
                city: this.state.city,
                dob: this.state.dob,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                mobile: this.state.mobile
            }
            switch (this.props.act) {
                case "Add":
                    this.props.addEmployee(data)
                    break;
                case "Edit":
                    this.props.editEmployee(data)
                    break;
                default:
                    break;
            }
        }
        
        // const headers = new Headers();
        // headers.append('Content-Type','application/json');
        //headers.append('applicationName','Scoring');
        //let url = 'http://localhost:8080/atao/atao-rest-service/Users/userRegistration?applicationName=ScoringIncdsiCA'
        // const data = {
        //     "username": this.state.username,
        //     "isActive": "true",
        //     "isExternal":"true",
        //     "generatedPassword": this.state.password,
        //     "confirmPassword":this.state.confirmpassword,
        //     "passwordHint": this.state.passwordhint,
        //     "crendential":this.state.password,
        //     "email": this.state.email
        // };
        // const options = {
        //     method:'POST',
        //     data,
        //     url
        // }
     
        // axios(options).then(response => console.log("successfully registered."))
        //         .catch(error => console.log(error));
        // }
    }
    componentDidMount(){
        if(this.props.singleEmp != null || this.props.singleEmp !== undefined){
            console.log(this.props.singleEmp)
            this.setState({
                id: this.props.singleEmp.id ? this.props.singleEmp.id: '',
                address: this.props.singleEmp.address ? this.props.singleEmp.address: '',
                city: this.props.singleEmp.city ? this.props.singleEmp.city: '',
                dob: this.props.singleEmp.dob ? this.props.singleEmp.dob: '',
                firstname: this.props.singleEmp.firstname ? this.props.singleEmp.firstname: '',
                lastname: this.props.singleEmp.lastname ? this.props.singleEmp.lastname: '',
                mobile: this.props.singleEmp.mobile ? this.props.singleEmp.mobile: ''
            })
        }
    }

    render() {
        return (
            <Form size='tiny' onSubmit={this.handleSubmit}>
                <Form.Group inline >
                    <Form.Input 
                        icon="user"
                        iconPosition="left"
                        placeholder="First Name" value={this.state.firstname}
                        name="firstname"
                        onChange = {this.handleChange}
                        width="16"
                    />
                    <Form.Input 
                        icon="user"
                        iconPosition="left"
                        placeholder="Last Name" value={this.state.lastname}
                        name="lastname"
                        onChange = {this.handleChange}
                        width="16"
                    />
                </Form.Group>
                <Form.Input
                    icon="mail"
                    iconPosition="left"
                    placeholder="Address"
                    type="address" value={this.state.address}
                    name="address"
                    onChange = {this.handleChange}
                />
                <Form.Input
                    icon="calendar alternate outline"
                    iconPosition="left"
                    placeholder="Date of Birth"
                    type="dob" value={this.state.dob}
                    name="dob"
                    onChange = {this.handleChange}
                />
                <Form.Input
                    icon="building outline"
                    iconPosition="left"
                    placeholder="Mobile"
                    type="mobile" value={this.state.mobile}
                    name="mobile"
                    onChange = {this.handleChange}
                />
                 <Form.Input
                    icon="building outline"
                    iconPosition="left"
                    placeholder="City"
                    type="city" value={this.state.city}
                    name="city"
                    onChange = {this.handleChange}
                />
                <br/>
                <Button primary>
                    {this.props.act}
                </Button>
            </Form>
        )
  }
}

const mapStateToProps = state => ({
    employee: state.employees.employee
})

export default connect(mapStateToProps,{addEmployee, editEmployee})(EmployeeForm);
