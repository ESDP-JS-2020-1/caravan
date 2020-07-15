import React from 'react';

import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";

import {apiURL} from "../../../config";
import {wordList} from "../../../wordList";
import {checkPermission} from "../../../CheckPermission";


const UserListItem = props => {
    const useStyles = makeStyles(() => ({
        offPadding: {
            padding: props.image ? '0px' : '10px 0',
        },
        avatar: {
            width: '100px',
            height: '100px',
            transition: '0.4s',
            '&:hover': {
                transform: 'scale(2.5)',
                zIndex: '100',
                marginLeft: '40%',
            },
        }
    }));

    let color = 'black';
    if (props.amount === 0) {
        color = 'red'
    }

    const classes = useStyles();
    const language = useSelector(state => state.language.name);
    return (
        <TableRow>
            <TableCell className={classes.offPadding}>
                {props.image && <Avatar className={classes.avatar} variant="square"
                                        src={apiURL.url + '/uploads/productImage/' + props.image}/>}
            </TableCell>
            <TableCell className={classes.offPadding}>{props.title}</TableCell>
            <TableCell className={classes.offPadding} style={{color: color}}>{props.amount}</TableCell>
            <TableCell className={classes.offPadding}>{props.productType}</TableCell>
            <TableCell className={classes.offPadding}>{props.price}</TableCell>
            <TableCell className={classes.offPadding}>
                {props.isRefrigeratorRequired ?
                    wordList[language].necessarily :
                    wordList[language].notNecessary
                }
            </TableCell>

            <TableCell className={classes.offPadding}>
                {checkPermission('editProduct') && <IconButton
                    aria-label="edit"
                    component={NavLink}
                    to={`/product/edit/${props.id}`}
                    id="edit"
                    exact
                >
                    <EditIcon/>
                </IconButton>}
            </TableCell>
        </TableRow>
    );
};

export default UserListItem;