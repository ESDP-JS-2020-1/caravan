import React from 'react';

import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";

import apiURL from "../../../apiURL";
import {wordList} from "../../../wordList";



const UserListItem = props => {
    const useStyles = makeStyles(() => ({
        offPadding: {
            padding: props.image ? '0px' : '10px 0'
        },
        avatar: {
            width: '100px',
            height: '100px'
        }
    }));

    const classes = useStyles();
    const language = useSelector(state => state.language.name);
    return (
        <TableRow>
            <TableCell className={classes.offPadding}>
                {props.image && <Avatar className={classes.avatar} variant="square" src={apiURL.url +'/uploads/productImage/'+props.image}/>}
            </TableCell>
            <TableCell className={classes.offPadding}>{props.title}</TableCell>
            <TableCell className={classes.offPadding}>{props.amount}</TableCell>
            <TableCell className={classes.offPadding}>{props.price}</TableCell>
            <TableCell className={classes.offPadding}>
                {props.isRefrigeratorRequired ?
                    wordList[language].necessarily :
                    wordList[language].notNecessary
                }
            </TableCell>
            {props.userInfo.role === 'admin' &&
            <TableCell className={classes.offPadding}>
                <IconButton
                    aria-label="edit"
                    component={NavLink}
                    to={`/product/edit/${props.id}`}
                    id={props.edit}
                    exact
                >
                    <EditIcon/>
                </IconButton>
            </TableCell>}
        </TableRow>
    );
};

export default UserListItem;