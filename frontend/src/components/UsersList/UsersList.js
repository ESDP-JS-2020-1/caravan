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
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const UsersList = props => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.users);
  const currentUser = useSelector(state => state.users.user);

  useEffect(() => {
    dispatch(getUsers(props.match.params.id))
  }, [dispatch, props.match.params.id]);

  const roles = ['admin', 'operator', 'courier', 'market'];

  return (
    <Box mt={2}>
      <Grid container justify='flex-end'>
        <Button
            variant='contained'
            color='primary'
            component={NavLink}
            to='/users/new'
            endIcon={<PersonAddIcon />}
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
                    <ListItemIcon style={{marginLeft: 'auto'}}>
                      {e === 'operator' && <ContactPhoneIcon />}
                      {e === 'admin' && <AccountBoxIcon />}
                      {e === 'courier' && <LocalShippingIcon />}
                      {e === 'market' && <ShoppingCartIcon />}
                    </ListItemIcon>
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
                  {props.match.params.id === 'market' && <>
                    <TableCell><b>Название компании</b></TableCell>
                    <TableCell><b>Адрес</b></TableCell>
                  </>}
                  {props.match.params.id === undefined && <>
                    <TableCell><b>Название компании</b></TableCell>
                    <TableCell><b>Адрес</b></TableCell>
                  </>}
                  <TableCell><b>Роль</b></TableCell>
                  {props.match.params.id === 'courier' && <>
                    <TableCell><b>Название машины</b></TableCell>
                    <TableCell><b>Объем машины</b></TableCell>
                    <TableCell><b>Наличие холодильника</b></TableCell>
                  </>}
                  {props.match.params.id === undefined && <>
                    <TableCell><b>Название машины</b></TableCell>
                    <TableCell><b>Объем машины</b></TableCell>
                    <TableCell><b>Наличие холодильника</b></TableCell>
                  </>}
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
                          carName={user.carName}
                          carVolume={user.carVolume}
                          carRefrigerator={user.carRefrigerator}
                          role={user.role}
                          paramsRole={props.match.params.id}
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