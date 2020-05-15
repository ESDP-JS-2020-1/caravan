import React from "react";

import {Redirect, Route} from "react-router-dom";

import {store} from '../../../store/configureStore'



const PrivateRoute = ({component: Component, path, exact, roles, ...rest}) => {
    return <Route path={path} exact={exact} {...rest} render={(props) => {
        const user = store.getState().users.user;
        return ( user !== null && roles && roles.every( p => user.group.some(g => g.permissions.includes(p)))) || (  user !== null && !roles)
            ? <Component {...props}/>
            : <Redirect to='/login' />
    }}
    />
}

export default PrivateRoute