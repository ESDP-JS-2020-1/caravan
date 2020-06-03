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
import {NavLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    title: {
        width: '60%',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

const Histories = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const histories = useSelector(state => state.histories.historiesList);
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getHistoriesList(props.match.params.page, props.match.params.limit));
    }, [dispatch, props.match.params.page, props.match.params.limit]);

    return (
        <div>
            <Pagination
                count={histories.pageAmount}
                color="primary"
                onChange={(e, num) => props.history.push(`/history/ ${num} / 10 `)}
            />
            {histories.length !== 0 ?
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
                            {histories.history.docs && histories.history.docs.map((history) => {
                                const info = history.info.data;
                                const schemaNameInPlural = history.info.schemaNameInPlural;

                                const userName = history.user.displayName;
                                let operationType = '';
                                let documentInfo = '';

                                if (userName !== 'fixtureOperation') {
                                    switch (history.type) {
                                        case 'edit':
                                            operationType = 'редактировал';
                                            break;
                                        case 'delete':
                                            operationType = 'удалил';
                                            break;
                                        case 'add':
                                            operationType = 'добавил';
                                            break;
                                        default:
                                            operationType = 'Not found';
                                            break;
                                    }
                                }

                                if (info.displayName) {
                                    documentInfo = info.displayName;
                                    operationType += ' пользователя'
                                }
                                if (info.name) documentInfo = info.name;
                                if (info.status) documentInfo = 'заявку';

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
                                                                :`${schemaNameInPlural}/${info._id}`
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
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer> :
                <Typography variant='h3'>
                    {'В истории пока ничего нет!'}
                </Typography>}
        </div>
    );
};

export default Histories;