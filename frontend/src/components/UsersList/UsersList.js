import React, {useEffect, useState} from 'react';

import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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

import {getUsers} from "../../store/actions/usersActions";
import UserListItem from "./UserListItem/UserListItem";
import FormElement from "../UI/Form/FormElement";
import {wordList} from "../../wordList";
import {checkPermission} from "../../CheckPermission";
import UserCardItem from "./UserCardItem";
import Typography from "@material-ui/core/Typography";


const UsersList = props => {
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
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getUsers(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    const [search, setSearch] = useState({search: ''});

    const changeSearch = e => {
        if (e.target.value[e.target.value.length - 1] === '\\') return setSearch({search: ''});
        setSearch({search: e.target.value});
    };

    const productList = users && users.filter(word => word.displayName.search(new RegExp(search.search, 'i')) !== -1);

    return (
        <Box mt={2}>
            <Grid container justify='space-between'>
                <Grid item>
                    <FormElement
                        propertyName="search"
                        title={wordList[language].usersList.searchTitle}
                        value={search.search}
                        onChange={changeSearch}
                        type="search"
                    />
                </Grid>
                {checkPermission('addUser') && <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        component={NavLink}
                        to='/users/new'
                        endIcon={<PersonAddIcon/>}
                    >
                        {wordList[language].usersList.addUserBtn}
                    </Button>
                </Grid>}
            </Grid>
            <Grid container item>
                {window.innerWidth <= 1200 &&
                <>
                    <Typography variant='h4'>{wordList[language].usersList.searchRole}</Typography>
                    <IconButton onClick={handleClick}><MenuIcon/></IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <List component="nav" aria-label="main mailbox folders" style={{padding: '0'}}>
                            <div>
                                <ListItem onClick={handleClose} component={NavLink} to={'/users'}
                                          style={{fontSize: 'bold'}} button>
                                    {wordList[language].usersList.listItemUsers}
                                </ListItem>
                                <Divider/>
                            </div>
                            {['admin', 'operator', 'courier', 'market'].map((e, i) => (
                                <div key={i}>
                                    <ListItem onClick={handleClose} component={NavLink} to={'/users/role/' + e}
                                              button>
                                        {e}
                                        <ListItemIcon style={{marginLeft: '10px'}}>
                                            {e === 'operator' && <ContactPhoneIcon/>}
                                            {e === 'admin' && <AccountBoxIcon/>}
                                            {e === 'courier' && <LocalShippingIcon/>}
                                            {e === 'market' && <ShoppingCartIcon/>}
                                        </ListItemIcon>
                                    </ListItem>
                                </div>
                            ))}
                        </List>
                    </Menu>
                    <Grid container>
                        {users && productList.map(user => {
                            const edit = currentUser.username !== user.username ? 'edit' : null;
                            return (
                                <UserCardItem
                                    key={user._id}
                                    id={user._id}
                                    edit={edit}
                                    user={user}
                                    paramsRole={props.match.params.id}
                                />
                            )
                        })}
                    </Grid>
                </>}
                {window.innerWidth > 1200 &&
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{marginTop: '10px'}}>
                    <TableContainer component={Paper}>
                        <Table aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>{wordList[language].usersList.tableName}</b></TableCell>
                                    <TableCell><b>{wordList[language].usersList.tableLogin}</b></TableCell>
                                    <TableCell><b>{wordList[language].usersList.tablePhone}</b></TableCell>
                                    {props.match.params.id === 'market' && <>
                                        <TableCell><b>{wordList[language].usersList.tableCompanyName}</b></TableCell>
                                        <TableCell><b>{wordList[language].usersList.tableAddress}</b></TableCell>
                                    </>}
                                    {props.match.params.id === undefined && <>
                                        <TableCell><b>{wordList[language].usersList.tableCompanyName}</b></TableCell>
                                        <TableCell><b>{wordList[language].usersList.tableAddress}</b></TableCell>
                                    </>}
                                    <TableCell><b>{wordList[language].usersList.tableRole}</b></TableCell>
                                    {props.match.params.id === 'courier' && <>
                                        <TableCell><b>{wordList[language].usersList.tableCarName}</b></TableCell>
                                        <TableCell><b>{wordList[language].usersList.tableCarVolume}</b></TableCell>
                                        <TableCell><b>{wordList[language].usersList.tableRefrigerator}</b></TableCell>
                                    </>}
                                    {props.match.params.id === undefined && <>
                                        <TableCell><b>{wordList[language].usersList.tableCarName}</b></TableCell>
                                        <TableCell><b>{wordList[language].usersList.tableCarVolume}</b></TableCell>
                                        <TableCell><b>{wordList[language].usersList.tableRefrigerator}</b></TableCell>
                                    </>}
                                    <TableCell> </TableCell>
                                    <TableCell>{
                                        <IconButton onClick={handleClick}><MenuIcon/></IconButton>}
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                    <TableCell>
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
                                            <ListItem onClick={handleClose} component={NavLink} to={'/users'}
                                                      style={{fontSize: 'bold'}} button>
                                                {wordList[language].usersList.listItemUsers}
                                            </ListItem>
                                            <Divider/>
                                        </div>
                                        {['admin', 'operator', 'courier', 'market'].map((e, i) => (
                                            <div key={i}>
                                                <ListItem onClick={handleClose} component={NavLink} to={'/users/role/' + e}
                                                          button>
                                                    {e}
                                                    <ListItemIcon style={{marginLeft: '10px'}}>
                                                        {e === 'operator' && <ContactPhoneIcon/>}
                                                        {e === 'admin' && <AccountBoxIcon/>}
                                                        {e === 'courier' && <LocalShippingIcon/>}
                                                        {e === 'market' && <ShoppingCartIcon/>}
                                                    </ListItemIcon>
                                                </ListItem>
                                            </div>
                                        ))}
                                    </List>
                                </Menu>
                            </TableHead>
                            <TableBody>
                                {users && productList.map(user => {
                                    const edit = currentUser.username !== user.username ? 'edit' : null;
                                    return (
                                        <UserListItem
                                            key={user._id}
                                            id={user._id}
                                            edit={edit}
                                            user={user}
                                            paramsRole={props.match.params.id}
                                        />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>}
            </Grid>
        </Box>
    );
};

export default UsersList;