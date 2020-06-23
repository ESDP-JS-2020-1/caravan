import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {push} from 'connected-react-router';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {nominatedRequest} from "../../../store/actions/requestsActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflowY: 'auto',
    },
}));

export default function CheckboxListSecondary(props) {
    const classes = useStyles();

    const dispatch = useDispatch();


    const linkInfo = (e,value) => {
        if (e.target.className !== 'material-icons MuiIcon-root') {
            dispatch(push(`/users/${value._id}`))
        }
    };
    const appointCourier = (value) => {
        console.log(props.request.request._id,value._id);
        dispatch(nominatedRequest(value._id, props.request.request._id));
        props.onClose()
    };

    return (
        <List dense className={classes.root}>

            {props.courierList().map((value, id) => {

                return (

                    <ListItem button key={id} onClick={(e) => linkInfo(e, value)}>
                        <ListItemAvatar>
                            <Avatar
                                src={value.avatar ? 'http://localhost:8000/uploads/userAvatar/' + value.avatar : ""}
                                alt={value.displayName}
                            />
                        </ListItemAvatar>

                        <ListItemText  primary={value.displayName}/>

                        <IconButton onClick={() => appointCourier(value)} aria-label="delete">
                            <Icon style={{fontSize: 30}}>add_circle</Icon>
                        </IconButton >
                    </ListItem>
                );
            })}
        </List>

    );
}