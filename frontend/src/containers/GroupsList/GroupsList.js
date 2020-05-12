import React, {useEffect} from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {useDispatch, useSelector} from "react-redux";
import {getGroups} from "../../store/actions/groupActions";
import GroupListItem from "./GroupListItem";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {wordList} from "../../wordList";

const GroupsList = () => {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.groups);
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getGroups())
    }, [dispatch]);

    const groupsList = groups && groups.map(elem => (
        <GroupListItem
            key={elem._id}
            id={elem._id}
            name={elem.name}
            amount={elem.list.length}
        />
    ));
    return (
        <div>
            <Typography variant='h4'>{wordList[language].groupsList.listGroupTitle}</Typography>
            <Button variant='contained' color='primary' component={NavLink} to={`/groups/new`}>
                {wordList[language].groupsList.addGroupBtn}
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>       <b>{wordList[language].groupsList.tableGroupTitle}</b>        </TableCell>
                            <TableCell> <b>{wordList[language].groupsList.tableGroupQty}</b> </TableCell>
                            <TableCell>                              </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groupsList}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default GroupsList;