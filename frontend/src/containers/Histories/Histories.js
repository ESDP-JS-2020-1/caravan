import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {makeStyles} from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import {Paper} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import {getHistoriesList} from "../../store/actions/HistoriesActions";

import {wordList} from "../../wordList";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Hidden from "@material-ui/core/Hidden";
import HistoriesListItem from "./HistoriesListItem/HistoriesListItem";
import Grid from "@material-ui/core/Grid";

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

    const determineType = (type) => {
        switch (type) {
            case 'edit':
                return 'редактировал';
            case 'delete':
                return 'удалил';
            case 'add':
                return 'добавил';
            default:
                return 'Not found';
        }
    }
    const determineInfo = (info) => {
        if (info.displayName) return  info.displayName;
        if (info.name) return  info.name;
        if (info.status) return  'заявку';
    }

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
                <>
                    <Hidden smDown>
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
                                        let operationType = determineType(history.type);
                                        let documentInfo = determineInfo(info);

                                        return (
                                            <HistoriesListItem
                                                key={history._id}
                                                userName={userName}
                                                operationType={operationType}
                                                documentInfo={documentInfo}
                                                info={info}
                                                schemaNameInPlural={schemaNameInPlural}
                                                history={history}
                                            />
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Hidden>
                    <Hidden mdUp>
                        <Grid container spacing={1}>
                            {histories.history.docs.map((history) => {
                                const info = history.info.data;
                                const schemaNameInPlural = history.info.schemaNameInPlural;

                                const userName = history.user.displayName;
                                let operationType = determineType(history.type);
                                let documentInfo = determineInfo(info);

                                return <HistoriesListItem
                                    key={history._id}
                                    userName={userName}
                                    operationType={operationType}
                                    documentInfo={documentInfo}
                                    info={info}
                                    schemaNameInPlural={schemaNameInPlural}
                                    history={history}
                                />
                            })}
                        </Grid>
                    </Hidden>
                </> :
                <Typography variant='h3'>
                    {'В истории пока ничего нет!'}
                </Typography>}
        </div>
    );
};

export default Histories;