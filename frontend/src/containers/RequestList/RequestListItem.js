import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";

const ProductListItem = props => {

    return (
        <TableRow>
            <TableCell>{props.user.displayName}</TableCell>
            <TableCell>{moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
            {props.userRoleInfo === 'admin' &&
            <TableCell >
                <IconButton
                    aria-label="edit"
                    component={NavLink}
                    to={`/requests/edit/${props.id}`}
                    id={props.edit}
                    exact
                >
                    <EditIcon/>
                </IconButton>
            </TableCell>
            }
        </TableRow>
    );
};

export default ProductListItem;