import React from 'react'
import LoginForm from '../Components/Loginform.component'
import LoginContainer from '../Components/Login-container.component'

export default function Loginpage() {  
    return (
        <LoginContainer 
            title="Registerd Users Sign In" 
            desc="Please Sign in using your Email id and Password" 
            styleClass={{padding: "10% 10%"}} 
            divcls="login-box">
            <LoginForm/>
        </LoginContainer>
    )
}