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
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import WithAuthorization from "../HOC/WithAuthorization/WithAuthorization";

const UsersList = WithAuthorization(props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{marginTop: '10px'}}>
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
                  <TableCell>{
                    <IconButton onClick={handleClick}><MenuIcon/></IconButton>}
                  </TableCell>
                </TableRow>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <List component="nav" aria-label="main mailbox folders" style={{padding: '0'}}>
                    <div>
                      <ListItem onClick={handleClose} component={NavLink} to={'/users'} style={{fontSize: 'bold'}} button>
                        All users
                      </ListItem>
                      <Divider />
                    </div>
                    {roles.map((e, i) => (
                      <div key={i}>
                        <ListItem onClick={handleClose} component={NavLink} to={'/users/'+e} button>
                          {e}
                          <ListItemIcon style={{marginLeft: '10px'}}>
                            {e === 'operator' && <ContactPhoneIcon />}
                            {e === 'admin' && <AccountBoxIcon />}
                            {e === 'courier' && <LocalShippingIcon />}
                            {e === 'market' && <ShoppingCartIcon />}
                          </ListItemIcon>
                        </ListItem>
                      </div>
                    ))}
                  </List>
                </Menu>
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
}, 'admin');

export default UsersList;