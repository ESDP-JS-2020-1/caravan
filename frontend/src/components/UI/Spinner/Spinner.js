import React from 'react';

import {makeStyles} from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from "@material-ui/core/Backdrop";


const useStyles = makeStyles((theme) => ({
    spinnerBlock: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: theme.zIndex.drawer + 1,
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: "-40px 0 0 -40px",
    },
    spinnerItem: {
        marginBottom: '10px'
    },
    backdrop: {
        color: '#fff',
    }
}));

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.spinnerBlock}>
            <div className={classes.spinner}>
                <Backdrop className={classes.backdrop} open>
                    <CircularProgress className={classes.spinnerItem} color="inherit"/>
                </Backdrop>
            </div>
        </div>
    );
}