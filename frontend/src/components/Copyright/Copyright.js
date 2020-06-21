import React from 'react';
import {NavLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <NavLink to='/' color="inherit">caravan-sytes.net</NavLink>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;