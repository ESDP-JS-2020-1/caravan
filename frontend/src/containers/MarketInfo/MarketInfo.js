import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMarketInfo} from "../../store/actions/requestsActions";

import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import moment from "moment";
import Typography from "@material-ui/core/Typography";
import {wordList} from "../../wordList";


const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: 'column',
        margin: '20px 0 0 0'
    },
    table: {
        minWidth: 650,
    },
    title: {
        width: '60%',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pagination: {
        margin: '15px auto 0 auto'
    },

});

const MarketInfo = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const info = useSelector(state => state.requests.requestInfo);
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getMarketInfo(props.match.params.id, props.match.params.page, props.match.params.limit))
    }, [dispatch, props.match.params.id, props.match.params.page, props.match.params.limit]);

    return (
        <div  style={{margin:'20px'}}>

            { info.docs && info.docs[0] && <Typography variant="h3" component="h3" gutterBottom>
                {info.docs[0].user.displayName}
            </Typography>}

            <TableContainer  component={Paper}>
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{wordList[language].marketInfo.title}</TableCell>
                                <TableCell align="right">{wordList[language].marketInfo.qty}</TableCell>
                                <TableCell align="right">{wordList[language].marketInfo.date}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {info.docs && info.docs.map((req,i) => {
                                return (
                                        <TableRow key={i + req.product._id}>
                                            <TableCell component="th" scope="row">
                                                {req.product.name}
                                            </TableCell>
                                            <TableCell align="right">{`${req.amount} (${req.product.productType})`}</TableCell>
                                            <TableCell align="right">
                                                {moment(req.date).format('MMMM Do YYYY, h:mm:ss a')}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {info.docs && (
                    <div style={{display:'flex'}}>
                    <Pagination
                        className={classes.pagination}
                        count={info.totalPages}
                        color="primary"
                        onChange={(e, num) => props.history.push(`/users/${props.match.params.id}/market_info/${num}/10`)}
                    />
                    </div>
                )}


        </div>
    );
};

export default MarketInfo;