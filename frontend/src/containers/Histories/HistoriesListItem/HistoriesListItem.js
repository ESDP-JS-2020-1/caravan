import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import {NavLink} from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import {wordList} from "../../../wordList";
import moment from "moment";
import TableRow from "@material-ui/core/TableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    title: {
        width: '60%',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

const HistoriesListItem = (
    {userName, operationType, documentInfo, info, schemaNameInPlural, history}
) => {
    const classes = useStyles();

    const language = useSelector(state => state.language.name);

    return (
        <TableRow key={history._id}>
            <TableCell component="th" scope="row">
                <div className={classes.title}>
                    <b>{userName}</b>
                    <p>{operationType}</p>
                    {history.type === 'delete' ?
                        <p>{documentInfo}</p> :
                        <NavLink exact
                                 to={info.productType ?
                                     `/?product=${info.name}`
                                     : `${schemaNameInPlural}/${info._id}`
                                 }>{documentInfo}</NavLink>}
                </div>
            </TableCell>
            <TableCell align="right">
                {history.type === 'delete' && (
                    <Chip
                        size="small"
                        label={wordList[language].histories.deleteLabel}
                        color="secondary"
                    />
                )}
                {history.type === 'add' && (
                    <Chip
                        size="small"
                        label={wordList[language].histories.addLabel}
                        color="primary"
                    />
                )}
                {history.type === 'edit' && (
                    <Chip
                        size="small"
                        label={wordList[language].histories.editLabel}
                    />
                )}
            </TableCell>
            <TableCell
                align="right">{moment(history.date).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
        </TableRow>
    );
};

export default HistoriesListItem;