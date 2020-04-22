import React from 'react';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const NoAuthUserToolBar = () => {
    return (
        <>
            <Button color='inherit' component={NavLink} to='/login' exact>Login</Button>
        </>
    );
};

export default NoAuthUserToolBar;