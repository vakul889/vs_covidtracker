import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import Pagetitle from '../Components/Page.title.component'
import { Grid, Segment } from 'semantic-ui-react'

export default function Mainpage() {
    const [message, setMessage] = useState("");
    const hello = ()=>{
      fetch('/api/hello')
                .then(response => response.text())
                .then(message => {
                    setMessage(message);
                });
    }
    useEffect(() => {
      setInterval(hello, 250);
    },[])
    return (
      <React.Fragment>
        <Pagetitle/>
        <h1 className="App-title">{message}</h1>
        <Segment placeholder size="huge">
          <Grid columns={2} stackable textAlign='center'>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                Existing Member?
                <br/><br/>
                <Button variant="contained" size="large" color="primary" href="/Login">SIGN IN</Button>
              </Grid.Column>
              <Grid.Column>
                New Member?
                <br/><br/>
                <Button variant="contained" size="large" color="primary" href="/Signup">SIGN UP</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        </React.Fragment>
    )
}
