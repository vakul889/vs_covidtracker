import React, { Component } from 'react'
import './App.css';
import { Route } from 'react-router-dom'
import Homepage from './Pages/Home.page'
import Mainpage from './Pages/Main.page'
import Loginpage from './Pages/Login.page'
import Signuppage from './Pages/Signup.page'
import ProtectedRoute from './Components/ProtectedRoute.component'

class App extends Component {
  state = {updated: false}

  componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(process.env.REACT_APP_API_HOST+"/api/thirdparty", requestOptions)
    .then(response => response.json())
    .then(result => {
       this.setState({updated: result.found});
    })
    .catch(error => console.log('error', error));
  }


  render() {
    const LoginWithBackground = Mainpage(Loginpage);
    const SignupWithBackground = Mainpage(Signuppage);
    if(this.state.updated){
      return (
        <React.Fragment>
          <ProtectedRoute exact path='/'>
            <Homepage/>
          </ProtectedRoute>
          <Route path='/Authenticate'>
            <LoginWithBackground/>
          </Route>
          <Route path='/Signup'>
            <SignupWithBackground/>
          </Route>
          <ProtectedRoute path='/CovidTracker'>
            <Homepage />
          </ProtectedRoute>
        </React.Fragment>
      );
    } else {
      return(
        <div>Fetching Updated Data.... </div>
      )
    }
  }
}

export default App;
