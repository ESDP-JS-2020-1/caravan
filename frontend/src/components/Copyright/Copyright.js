import React from 'react';
import {NavLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const Copyright = () => {
    return (
        <Typography style={{fontSize: '16px', color: '#fff', margin: '0 auto', padding: '0 5px 0 5px'}} variant="body2" color="textSecondary">
            {'Copyright © '}
    <NavLink style={{color: '#fff'}} to='/' color="inherit">caravan-sytes.net{' '}</NavLink>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;