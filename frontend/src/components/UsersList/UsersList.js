import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {NavLink} from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import UserListItem from "./UserListItem/UserListItem";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    hrBorder: {
        border: '1px solid #0d47a1',
        marginBottom: '2%',
    },

});
const UserList = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const users = useSelector(state => state.users.users)

    return (
        <Box mt={2}>
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        component={NavLink}
                        to='/users/new'
                    >Добавить нового пользователя</Button>
                </Grid>
            </Grid>
            <hr className={classes.hrBorder}/>
            <Box mt={2}>
                <Grid container>
                    <Grid item xs>
                        <TableContainer component={Paper}>
                            <Table aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Имя</b></TableCell>
                                        <TableCell><b>Логин</b></TableCell>
                                        <TableCell><b>Телефон</b></TableCell>
                                        <TableCell><b>Название компании</b></TableCell>
                                        <TableCell><b>Адрес</b></TableCell>
                                        <TableCell><b>Роль</b></TableCell>
                                        <TableCell> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users && users.map(user => (
                                        <UserListItem
                                            key={user._id}
                                            id={user._id}
                                            displayName={user.displayName}
                                            username={user.username}
                                            phone={user.phone}
                                            companyName={user.companyName}
                                            address={user.address}
                                            role={user.role}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default UserList;

