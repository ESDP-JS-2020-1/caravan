import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTrash} from "../../store/actions/trashActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    spinnerBlock: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: "-40px 0 0 -40px"
    }
})

const Trash = () => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const loading = useSelector(state => state.trashReducer.loading);

    useEffect(() => {
        dispatch(getTrash())
    }, [])

    if (loading) {
        return (
            <div className={classes.spinnerBlock}>
                <CircularProgress className={classes.spinner} />
            </div>
        )
    }

    return (
        <Container>
            <Box mt={1}>
                <Grid container>
                    <Grid item>
                        <Typography variant='h3'>
                            {'Корзина'}
                        </Typography>
                    </Grid>
                    <Grid item container>

                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Trash;