import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";

const UserListItem = props => {
    return (
        <TableRow>
            <TableCell>
                <Avatar style={{width: '100px', height: '100px'}} variant="square" src={props.image ? 'http://localhost:8000/uploads/productImage/'+props.image : props.title}/>
            </TableCell>
            <TableCell>{props.title}</TableCell>
            <TableCell>{props.amount}</TableCell>
            <TableCell>{props.price}</TableCell>
            <TableCell>
                <IconButton
                    aria-label="edit"
                    component={NavLink}
                    to={`/product/edit/${props.id}`}
                    id={props.edit}
                    exact
                >
                    <EditIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default UserListItem;