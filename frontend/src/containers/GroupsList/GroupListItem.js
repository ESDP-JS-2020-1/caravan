import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const GroupListItem = props => {

    return (
        <TableRow>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.amount}</TableCell>
            <TableCell>
                <Button
                    variant='contained'
                    color='primary'
                    component={NavLink}
                    to={`/groups/${props.id}`}
                >Добавить пользователей</Button>
            </TableCell>
        </TableRow>
    );
};

export default GroupListItem;