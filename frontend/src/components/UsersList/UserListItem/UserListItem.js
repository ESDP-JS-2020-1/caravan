import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import TableRow from "@material-ui/core/TableRow";
import VisibilityIcon from "@material-ui/icons/Visibility";

const UserListItem = props => {
    return (
        <TableRow>
            <TableCell>{props.user.displayName}</TableCell>
            <TableCell>{props.user.username}</TableCell>
            <TableCell>{props.user.phone}</TableCell>
            {props.paramsRole === 'market' || props.user.role === 'market' ? <>
                {props.user.market && <>
                    <TableCell>{props.user.market.companyName}</TableCell>
                    <TableCell>{props.user.market.address}</TableCell>
                </>}
            </> : <>
                {props.paramsRole === undefined && <>
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                </>}
            </>}
            <TableCell>{props.user.role}</TableCell>
            {props.paramsRole === 'courier' || props.user.role === 'courier' ? <>
                {props.user.courier && <>
                    <TableCell>{props.user.courier.carName}</TableCell>
                    <TableCell>{props.user.courier.carVolume}</TableCell>
                    <TableCell>{props.user.courier.carRefrigerator && 'Есть'}</TableCell>
                </>}
            </> : <>
                {props.paramsRole === undefined && <>
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                    <TableCell> </TableCell>
                </>}
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
            <TableCell>
                <IconButton
                    aria-label="show info"
                    component={NavLink}
                    to={`/user/${props.id}`}
                    id={props.edit}
                    exact
                >
                    <VisibilityIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default UserListItem;