import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {wordList} from "../../wordList";
import {useSelector} from "react-redux";

const useStyle = makeStyles({
    button: {
        width: '300px',
        height: 'auto'
    }
});

const DownloadApp = () => {
    const classes = useStyle();
    const language = useSelector(state => state.language.name);

    return (
        <Grid container justify='center' spacing={2}>
            <Grid item>
                <Typography variant='h3'>
                    {wordList[language].downloadApp.title}
                </Typography>
            </Grid>
            <Grid item container justify='center' spacing={2}>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        startIcon={<AndroidIcon/>}
                        size="large"
                        className={classes.button}
                    >
                        Android
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        startIcon={<AppleIcon/>}
                        size="large"
                        className={classes.button}
                    >
                        Ios
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <Container>
                    <Box fontWeight="fontWeightMedium" mt={5}>
                        <Typography>
                            {wordList[language].downloadApp.description}
                        </Typography>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
};

export default DownloadApp;