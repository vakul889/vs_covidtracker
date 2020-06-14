import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import {fetchManager} from '../Actions/managerActions'

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : ''

        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.email != ''){
            const data = {
                email: this.state.email,
                password: this.state.password
            }
            
            this.props.fetchManager(data)
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
                    <Form.Input
                        name="email"
                        icon="mail"
                        iconPosition="left"
                        placeholder="Email ID"
                        onChange = {this.handleChange}
                    />
                    <Form.Input
                        name="password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"  
                        type="password"
                        onChange = {this.handleChange}
                    />
                    <br/>
                    <Button primary>
                        Login
                    </Button>
                </Form>
                <br/>
                <p> Not Registered ? <Link to="/Signup">Sign Up</Link> Here </p>
            </React.Fragment>
        )
  }
}

const mapStateToProps = state => ({
    manager: state.manager.manager
})

export default connect(mapStateToProps, { fetchManager })(LoginForm)