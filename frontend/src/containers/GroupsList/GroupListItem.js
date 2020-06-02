import React from 'react';

import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

import {wordList} from "../../wordList";


const GroupListItem = props => {
    const language = useSelector(state => state.language.name);

    return (
        <TableRow>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.amount}</TableCell>
            <TableCell>
                <Button
                    id={'name' + props.index}
                    variant='contained'
                    color='primary'
                    component={NavLink}
                    to={`/groups/${props.id}`}
                >{wordList[language].groupsList.addUsersBtn}</Button>
            </TableCell>
        </TableRow>
    );
};

export default GroupListItem;