import Login from "../../../containers/Login/Login";
import AccessDenied from "../../AccessDenied/AccessDenied";

const WithAuthorization = (WrappedComponent, roles) => {
  roles = roles ? roles.split(' ') : []
  console.log(roles);
  const user = JSON.parse(localStorage.getItem('state'));

  let component = WrappedComponent;

  if (!user.users.user) {
    component = Login
  }

  if(user.users.user && !user.users.user.role.includes(roles) && roles.length !== 0) {
    component = AccessDenied
  }

  return component;
}

export default WithAuthorization;