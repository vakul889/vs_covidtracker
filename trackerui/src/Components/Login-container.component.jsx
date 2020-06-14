import React from 'react';
import './login.css';
import { Container, Header } from 'semantic-ui-react';

export default function LoginContainer({children,...props}) {
  var clsname = "login-box-background shadow center-align round ";
  var compcls = props.divcls;
  return (
    <div className={clsname + compcls} >
        <Container style={props.styleClass}>
          <Header as="h2" textAlign="center">
            {props.title} 
          </Header>
          <Header as="h5" textAlign="center">
            {props.desc} 
          </Header>
          <br/>
          {children}
        </Container>
    </div>
  );
}
