import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import TableRow from "@material-ui/core/TableRow";

const UserListItem = props => {
    return (
        <TableRow>
            <TableCell>{props.displayName}</TableCell>
            <TableCell>{props.username}</TableCell>
            <TableCell>{props.phone}</TableCell>
            {props.paramsRole === 'market' && <>
                <TableCell>{props.companyName}</TableCell>
                <TableCell>{props.address}</TableCell>
            </>}
            {props.paramsRole === undefined && <>
                <TableCell>{props.companyName}</TableCell>
                <TableCell>{props.address}</TableCell>
            </>}
            <TableCell>{props.role}</TableCell>
            {props.paramsRole === 'courier' && <>
                <TableCell>{props.carName}</TableCell>
                <TableCell>{props.carVolume}</TableCell>
                <TableCell>{props.carRefrigerator && 'Есть'}</TableCell>
            </>}
            {props.paramsRole === undefined && <>
                <TableCell>{props.carName}</TableCell>
                <TableCell>{props.carVolume}</TableCell>
                <TableCell>{props.carRefrigerator && 'Есть'}</TableCell>
            </>}
            <TableCell>
                <IconButton
                    aria-label="editUser"
                    component={NavLink}
                    to={`/users/edit/${props.id}`}
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