import React from 'react'
import SignupForm from '../Components/Signupform.component'
import LoginContainer from '../Components/Login-container.component'

export default function Signuppage() {  
    return (
        <LoginContainer 
          title="Manager Registration" 
          desc="Please fill in the details below to register yourself in our portal."
          styleClass={{ padding: '40px 20%' }} 
          divcls="signup-box">
          <SignupForm/>
        </LoginContainer>
    )
}
