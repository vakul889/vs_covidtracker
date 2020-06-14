import React, { Component } from 'react'
import { Form, Checkbox, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
//import {addUser} from '  actions/userActions'

class SignupForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname : '',
            lastname : '',
            email : '',
            password : '',
            address: '',
            dob: '',
            company: ''

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.email != ''){
            const data = {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                email : this.state.email,
                password : this.state.password,
                address: this.state.address,
                dob: this.state.dob,
                company: this.state.company
            }
            
            //this.props.addUser(data)
        }
        // const headers = new Headers();
        // headers.append('Content-Type','application/json');
        // headers.append('applicationName','Scoring');
        // let url = 'http://192.168.1.200:8080/mgrportal/manager'
        // const data = {
        //     "email":this.state.email,
        //     "firstname":this.state.firstname,
        //     "lastname":this.state.lastname,
        //     "password":this.state.password,
        //     "address":this.state.address,
        //     "dob":this.state.dob,
        //     "company":this.state.company
        // }
        // const options = {
        //     method:'POST',
        //     data,
        //     url
        // }
        // axios(options).then(response => console.log("successfully registered."))
        //         .catch(error => console.log(error));
        }

    render() {
        return (
            <React.Fragment>
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
                    placeholder="Email" value={this.state.email}
                    name="email"
                    onChange = {this.handleChange}
                    width="16"
                />
                <Form.Group inline>
                <Form.Input
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password" value={this.state.password}
                    name="password"
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
                    width="15"
                />
                <Form.Group inline>
                <Form.Input
                    icon="calendar alternate outline"
                    iconPosition="left"
                    placeholder="Date of Birth"
                    type="dob" value={this.state.dob}
                    name="dob"
                    onChange = {this.handleChange}
                    width="16"
                />
                <Form.Input
                    icon="building outline"
                    iconPosition="left"
                    placeholder="Company"
                    type="company" value={this.state.company}
                    name="company"
                    onChange = {this.handleChange}
                    width="16"
                />
                </Form.Group>
                <br/>
                <Form.Field>
                    <Checkbox label='I have read and agree with the privacy policy' />
                </Form.Field>
                <br/>
                <Button  primary>
                    Submit
                </Button>
            </Form>
            <br/>
            <p> Already Registered ? <Link to={{pathname: "./Login", state: { modal: true }}}>Login</Link> Here </p>
            </React.Fragment>
        )
  }
}

// const mapStateToProps = state => ({
//     user: state.user.user
// })

//export default connect(mapStateToProps, { addUser })(SignupForm)
export default SignupForm;