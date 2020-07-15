import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import {wordList} from "../../wordList";
import {useSelector} from "react-redux";

const PageNotFound = () => {
    const {pathname} = useLocation();
    const language = useSelector(state => state.language.name);

    return (
        <Grid container direction='column'>
            <Grid item>
                <Typography variant='h3'>
                    {wordList[language].pageNotFound.title} "{pathname}" {wordList[language].pageNotFound.title2}
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    {wordList[language].pageNotFound.description} <Typography component={NavLink} to='/'>{wordList[language].pageNotFound.description2}</Typography>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PageNotFound;