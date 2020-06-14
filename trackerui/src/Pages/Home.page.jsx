import React, { Component } from 'react'
import { Segment, Header, Button } from 'semantic-ui-react'
import Pagetitle from '../Components/Page.title.component'
import EmployeeCardsList from '../Components/Employee.Cards.List.component'

export default class Homepage extends Component {
  signout = () => {
    localStorage.removeItem("username")
  }
  render() {
    return (
      <div className="center-align">
        <div style={{position: 'absolute', right: 0}}>
          <a href="/Authenticate" onClick={()=> this.signout()}><Button>Signout</Button></a>
        </div>
        <Pagetitle/>
        <Segment color="blue" inverted size="tiny">
          <Header as="h3" >
            Manage Employee List
          </Header>
        </Segment>
        <EmployeeCardsList/>
      </div>
    )
  }
}
