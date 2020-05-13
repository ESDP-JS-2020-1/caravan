import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    spinner: {
        marginTop: '1%',
        margin: '0 auto'
    }
}));

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress className={classes.spinner} color="secondary" />
        </div>
    );
}