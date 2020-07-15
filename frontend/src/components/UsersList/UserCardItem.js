import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {red} from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import {NavLink} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '1000x',
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
        padding: '10px'
    }
}));

const UserCardItem = props => {
    const classes = useStyles();
    useEffect(()=>{

    },[props.user.avatar]);
    return (
        <Grid item xs={12} sm={6} md={4} className={classes.padding}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar
                            src={props.user.avatar ? 'http://localhost:8000/uploads/userAvatar/' + props.user.avatar : "/broken-image.jpg"}
                            alt={props.user.displayName}/>
                    }
                    title={ props.user.displayName }
                    subheader={ props.user.role }
                />
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        component={NavLink}
                        to={`/users/edit/${props.id}`}
                        id={props.edit}
                        exact
                    >
                        <EditIcon/>
                    </IconButton>
                    <IconButton
                        aria-label="share"
                        component={NavLink}
                        to={`/users/${props.id}`}
                        id={props.edit}
                        exact
                    >
                        <VisibilityIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default UserCardItem;