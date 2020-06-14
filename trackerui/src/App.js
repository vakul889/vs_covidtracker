import React, { Component } from 'react'
import './App.css';
import { Route } from 'react-router-dom'
import Homepage from './Pages/Home.page'
import Mainpage from './Pages/Main.page'
import Loginpage from './Pages/Login.page'
import Signuppage from './Pages/Signup.page'
import ProtectedRoute from './Components/ProtectedRoute.component'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ProtectedRoute exact path='/'>
          <Homepage/>
        </ProtectedRoute>
        <Route path='/Authenticate'>
          <Mainpage/>
        </Route>
        <Route path='/Login'>
          <Loginpage />
        </Route>
        <Route path='/Signup'>
          <Signuppage/>
        </Route>
        <ProtectedRoute path='/Homepage'>
          <Homepage />
        </ProtectedRoute>
      </React.Fragment>
    );
  }
}

export default App;
