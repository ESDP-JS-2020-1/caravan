import React from "react";
import Login from "../../../containers/Login/Login";
import AccessDenied from "../../AccessDenied/AccessDenied";

const WithAuthorization = (WrappedComponent, roles) => props => {

  const permissions = roles ? roles.split(' ') : [];

  const user = JSON.parse(localStorage.getItem('state'));

  let component = <WrappedComponent {...props}/>;

  if (!user.users.user) {
    component = <Login {...props}/>
  }

  if(user.users.user && !permissions.includes(user.users.user.role) && permissions.length !== 0) {
    component = <AccessDenied {...props}/>
  }

  return component;
}

export default WithAuthorization;