import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import moment from "moment";

import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import {Paper} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Chip from "@material-ui/core/Chip";

import {getHistoriesList} from "../../store/actions/HistoriesActions";


import {wordList} from "../../wordList";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Histories = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const histories = useSelector(state => state.histories.historiesList);
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getHistoriesList());
    }, [dispatch]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>{wordList[language].histories.tableInfo}</TableCell>
                        <TableCell align="right">{wordList[language].histories.tableType}</TableCell>
                        <TableCell align="right">{wordList[language].histories.tableDate}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {histories.map((history) => (
                        <TableRow key={history._id}>
                            <TableCell component="th" scope="row">
                                {history.title}
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
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Histories;