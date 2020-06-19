import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { addUser} from '../Actions/userActions';

class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname : '',
            lastname : '',
            email : '',
            password : '',
            confirmpassword : '',
            error: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.confirmpassword !== this.state.password){
            this.setState({error:{
                password: "Password and Confirm Password doesn't match"
            }});
        } else if(this.state.firstname.length > 30){
            this.setState({error:{
                firstname: "First Name should be less that 30 characters"
            }});
        } else if(this.state.lastname.length > 30){
            this.setState({error:{
                lastname: "Last Name should be less that 30 characters"
            }});
        } else if(this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".") === -1){
            this.setState({error:{
                email: "Email Address is not valid"
            }});
        } else {
            const data = {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                email : this.state.email,
                password : this.state.password
            }
            this.props.addUser(data)
        }
    }

    render() {
        return (
            <React.Fragment>
            <Form size='tiny' onSubmit={this.handleSubmit}>
                <Form.Input required
                    icon="user"
                    error={this.state.error.firstname}
                    iconPosition="left"
                    placeholder="First Name" value={this.state.firstname}
                    name="firstname"
                    onChange = {this.handleChange}
                    width="16"
                />
                <Form.Input required
                    icon="user"
                    error={this.state.error.lastname}
                    iconPosition="left"
                    placeholder="Last Name" value={this.state.lastname}
                    name="lastname"
                    onChange = {this.handleChange}
                    width="16"  
                />
                <Form.Input required
                    icon="mail"
                    error={this.state.error.email}
                    iconPosition="left"
                    placeholder="Email" value={this.state.email}
                    name="email"
                    onChange = {this.handleChange}
                    width="16"
                />
                <Form.Input required
                    icon="lock"
                    error={this.state.error.password}
                    iconPosition="left"
                    placeholder="Password"
                    type="password" value={this.state.password}
                    name="password"
                    onChange = {this.handleChange}
                    width="16"
                />
                <Form.Input required
                    icon="lock"
                    error={this.state.error.password}
                    iconPosition="left"
                    placeholder="Confirm Password"
                    type="password" value={this.state.confirmpassword}
                    name="confirmpassword"
                    onChange = {this.handleChange}
                    width="16"
                />
                <br/>
                <Button primary>Submit</Button>
                <p style={{fontSize: 'small'}}> Already Registered ? <Link to={{pathname: "./CovidTracker"}}>Login</Link> Here </p>
            </Form>
            </React.Fragment>
        )
  }
}

const mapStateToProps = state => ({
    user: state.users.user
})

export default connect(mapStateToProps, { addUser })(SignupForm)
