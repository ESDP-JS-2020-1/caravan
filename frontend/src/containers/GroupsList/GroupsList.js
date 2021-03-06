import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import GroupListItem from "./GroupListItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {getGroups} from "../../store/actions/groupActions";
import {wordList} from "../../wordList";
import {checkPermission} from "../../CheckPermission";
import Box from "@material-ui/core/Box";
import GroupCardItem from "./GroupCardItem";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    flex: {
        display: 'flex',
        flexWrap: 'wrap'
    },
}));


const GroupsList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.groups);
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getGroups())
    }, [dispatch]);

    const groupsList = groups && groups.map((elem, index) => {
        const amount = elem.list.filter(e => !!e.user).length
        return <GroupListItem
            index={index}
            key={elem._id}
            id={elem._id}
            name={elem.name}
            amount={amount}
        />
    });
    const groupsCard = groups && groups.map((elem, index) => (
        <GroupCardItem
            index={index}
            key={elem._id}
            id={elem._id}
            name={elem.name}
            amount={elem.list.length}
        />
    ));
    return (
        <>
            {window.innerWidth > 1200 &&
            <Box component='div'>
                <Typography variant='h4'>{wordList[language].groupsList.listGroupTitle}</Typography>
                {checkPermission('addGroup') &&
                <Button variant='contained' color='primary' component={NavLink} to={`/groups/new`}>
                    {wordList[language].groupsList.addGroupBtn}
                </Button>}
                <TableContainer component={Paper}>
                    <Table aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell> <b>{wordList[language].groupsList.tableGroupTitle}</b> </TableCell>
                                <TableCell> <b>{wordList[language].groupsList.tableGroupQty}</b> </TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groupsList}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            }
            {window.innerWidth <= 1200 &&
            <>
                <Box component='div' m={2}>
                    <Typography variant='h4'>{wordList[language].groupsList.listGroupTitle}</Typography>
                    {checkPermission('addGroup') &&
                    <Button variant='contained' color='primary' component={NavLink} to={`/groups/new`}>
                        {wordList[language].groupsList.addGroupBtn}
                    </Button>}
                </Box>
                <Box className={classes.flex} component='div'>
                    {groupsCard}
                </Box>
            </>
            }
        </>
    );
};

export default GroupsList;