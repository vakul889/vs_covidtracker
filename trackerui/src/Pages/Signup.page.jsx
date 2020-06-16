import React from 'react'
import SignupForm from '../Components/Signupform.component'
import LoginContainer from '../Components/Login-container.component'

export default function Signuppage() {  
    return (
        <LoginContainer 
          title="Register an Account" 
          desc="Please fill in the details below to register yourself in our portal."
          styleClass={{ padding: '10% 10%' }} 
          divcls="signup-box">
          <SignupForm/>
        </LoginContainer>
    )
}
