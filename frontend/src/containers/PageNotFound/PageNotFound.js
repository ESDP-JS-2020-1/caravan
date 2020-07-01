import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import { useLocation } from 'react-router-dom'

const PageNotFound = () => {
    const {pathname} = useLocation();
    return (
        <Grid container direction='column'>
            <Grid item>
                <Typography variant='h3'>
                    404 страница "{pathname}" не найдена
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    Перейти на <Typography component={NavLink} to='/'>главную страницу</Typography>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PageNotFound;