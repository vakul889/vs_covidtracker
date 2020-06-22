import React from 'react';
import {
    Redirect,
    Route
} from 'react-router-dom'


export default function ProtectedRoute({children, ...props}) {
    let isAuthenticated = localStorage.getItem("username")? true: false;
  return (
    <Route
        {...props}
        render = { () =>
            isAuthenticated ? (
                children
            ) : (
                <Redirect 
                    to={{
                        pathname: "/Authenticate"
                    }}  
                />
            )
        }  
    />
  );
}