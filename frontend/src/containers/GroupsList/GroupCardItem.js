import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {red} from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import {NavLink} from "react-router-dom";
import {wordList} from "../../wordList";
import Button from "@material-ui/core/Button";
import {useSelector} from "react-redux";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '1000x',
        textAlign: 'center',

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    padding: {
        padding: '15px',
    },
    cardBtn: {
        margin: '0 auto'
    }

}));

const GroupCardItem = props => {
    const language = useSelector(state => state.language.name);
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4} className={classes.padding}>
            <Card className={classes.root}>
                <CardContent>
                    <h2>{wordList[language].groupsList.tableGroupTitle}: {props.name}</h2>
                    <h3>{wordList[language].groupsList.tableGroupQty}: {props.amount}</h3>
                </CardContent>
                <CardActions disableSpacing>
                    <Button
                        className={classes.cardBtn}
                        id={'name' + props.index}
                        variant='contained'
                        color='primary'
                        component={NavLink}
                        to={`/groups/${props.id}`}
                    >{wordList[language].groupsList.addUsersBtn}</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default GroupCardItem;