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
      <TableCell>{props.companyName}</TableCell>
      <TableCell>{props.address}</TableCell>
      <TableCell>{props.role}</TableCell>
      <TableCell>
        <IconButton
          aria-label="edit"
          component={NavLink}
          to={`/users/edit/${props.id}`}
          exact
        >
          <EditIcon/>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserListItem;