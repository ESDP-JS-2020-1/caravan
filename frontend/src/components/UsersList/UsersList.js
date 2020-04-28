import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../store/actions/usersActions";
import UserListItem from "./UserListItem/UserListItem";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

const UsersList = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.users);
  const currentUser = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch]);

  const roles = ['admin', 'operator', 'courier', 'market'];

  return (
    <Box mt={2}>
      <Grid container justify='flex-end'>
        <Button
            variant='contained'
            color='primary'
            component={NavLink}
            to='/users/new'
        >
          Добавить пользователя
        </Button>
      </Grid>
      <Grid container item>

        <Grid item xs={2}>
          <List component="nav" aria-label="main mailbox folders">
            <div>
              <ListItem component={NavLink} to={'/users'} style={{padding: '20px'}} button>
                All users
              </ListItem>
              <Divider />
            </div>
            {roles.map((e, i) => (
                <div key={i}>
                  <ListItem component={NavLink} to={'/users/'+e} style={{padding: '20px'}} button>
                    {e}
                  </ListItem>
                  <Divider />
                </div>
            ))}
          </List>
        </Grid>

        <Grid item xs={10}>
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
                {users && users.map(user => {
                  const edit = currentUser.username !== user.username ? 'edit' : null;
                  return (
                      <UserListItem
                          key={user._id}
                          id={user._id}
                          edit={edit}
                          displayName={user.displayName}
                          username={user.username}
                          phone={user.phone}
                          companyName={user.companyName}
                          address={user.address}
                          role={user.role}
                      />
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

      </Grid>
    </Box>
  );
};

export default UsersList;