import React from 'react';
import './login.css';
import { Container, Header } from 'semantic-ui-react';

export default function LoginContainer({children,...props}) {
  var clsname = "login-box-background shadow center-align round ";
  var compcls = props.divcls;
  return (
    <div className={clsname + compcls} style={{overflowY: 'scroll'}}>
        <Container style={props.styleClass}>
          <Header as="h3" textAlign="center">
            {props.title} 
          </Header>
          <p>{props.desc}</p>
          <br/>
          {children}
        </Container>
    </div>
  );
}
