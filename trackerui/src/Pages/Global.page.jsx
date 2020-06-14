import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Container } from '@material-ui/core';
import {Link} from 'react-router-dom'
import { Icon, Header, Grid } from 'semantic-ui-react';

export default function Globalpage({children,...props}) {
  var user = localStorage.getItem("username")
  if(user!=null){
    user = "Welcome "+user+" !"
  }
  return (
    <div>
      <AppBar color="default"  position="static" style={{marginBottom: "10px"}}>
          <div style={{padding: "15px"}}>
              <Grid verticalAlign="middle">
                <Grid.Row >
                  <Grid.Column width={14}>
                    <Link to="/Homepage"><Icon color="black" name='home' size="big" /></Link>
                  </Grid.Column>
                  <Grid.Column width={2}>
  <Header as="h4" >{user}</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>            
          </div>
      </AppBar>
      <Container maxWidth="lg">
            {children}
      </Container>
    </div>
  );
}