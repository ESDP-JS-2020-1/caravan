import React from "react";
import Login from "../../../containers/Login/Login";
import AccessDenied from "../../AccessDenied/AccessDenied";

const WithAuthorization = (WrappedComponent, roles) => props => {
  console.log(typeof roles);
  const permissions = roles ? roles.split(' ') : []
  console.log(permissions);
  const user = JSON.parse(localStorage.getItem('state'));

  let component = <WrappedComponent {...props}/>;

  if (!user.users.user) {
    component = <Login {...props}/>
  }

  if(user.users.user && !user.users.user.role.includes(permissions) && permissions.length !== 0) {
    component = <AccessDenied {...props}/>
  }

  return component;
}

export default WithAuthorization;