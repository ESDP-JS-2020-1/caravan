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

const GroupsList = () => {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.groups);

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
            <Typography variant='h4'>Список групп</Typography>
            <Button variant='contained' color='primary' component={NavLink} to={`/groups/new`}>Добавить группу</Button>
            <TableContainer component={Paper}>
                <Table aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>       <b>Название</b>        </TableCell>
                            <TableCell> <b>Количество участников</b> </TableCell>
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