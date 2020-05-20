import React from 'react';

import {NavLink} from "react-router-dom";
import moment from "moment";

import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TableRow from "@material-ui/core/TableRow";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Chip from "@material-ui/core/Chip";
import {useSelector} from "react-redux";
import {wordList} from "../../wordList";



const ProductListItem = props => {
    const language = useSelector(state => state.language.name);

    return (
        <TableRow>
            <TableCell>{props.user.displayName}</TableCell>
            <TableCell>{moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
            <TableCell>
                {props.status === 'pending' &&
                <Chip label={wordList[language].requestListItem.label_1} />}
                {props.status === 'performed' &&
                <Chip color='primary' label={wordList[language].requestListItem.label_2} />}
                {props.status === 'closed' &&
                <Chip color='secondary' label={wordList[language].requestListItem.label_3} />}
            </TableCell>
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
            <TableCell >
                <IconButton
                    aria-label="show info"
                    component={NavLink}
                    to={`/requests/${props.id}`}
                    id={props.user.role + 'Q' + props.user.phone}
                    exact
                >
                    <VisibilityIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default ProductListItem;