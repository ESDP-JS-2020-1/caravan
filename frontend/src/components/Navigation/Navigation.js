import React from 'react';
import clsx from 'clsx';
import {NavLink} from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import ToolBar from "../UI/toolBar/toolBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from '@material-ui/core/ListItemText';
import FastfoodSharpIcon from '@material-ui/icons/FastfoodSharp';
import CreateNewFolderSharpIcon from '@material-ui/icons/CreateNewFolderSharp';
import {useSelector} from "react-redux";
import GroupIcon from '@material-ui/icons/Group';
import DescriptionIcon from '@material-ui/icons/Description';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HistoryIcon from '@material-ui/icons/History';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainLink: {
        color: 'inherit',
        flexGrow: 1,
        textDecoration: 'none',
        '&hover': {
            color: 'inherit'
        }
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    list: {
        width: 290,
    },
    fullList: {
        width: 'auto',
    },
}));


const Navigation = () => {
    const classes = useStyles();
    const user = useSelector(state => state.users.user);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const ProductsList = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/products">Список продуктов</NavLink>);
    const CreateNewRequest = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/requests/new">Создать заявку</NavLink>);
    const UserList = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/users">Список пользователей</NavLink>);
    const RequestsList = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/requests">Список заявок</NavLink>);
    const ProductAdd = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/product/add">Добавить пробукты</NavLink>);
    const History = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/history">История</NavLink>);
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {user && user.role === 'admin' && (
                <List>
                    {[UserList].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{<GroupIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            )}
            {user && user.role === 'admin' && (
                <List>
                    {[RequestsList].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{<DescriptionIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            )}
            {user && user.role === 'admin' && (
                <List>
                    {[ProductAdd].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{<AddShoppingCartIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            )}
            {user && user.role === 'admin' && (
                <List>
                    {[History].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{<HistoryIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            )}
            <List style={{height: '35px'}}>
                {[ProductsList].map((text) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{<FastfoodSharpIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            {user && user.role === 'market' && (
                <List>
                    {[CreateNewRequest].map((text) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{<CreateNewFolderSharpIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            )}

        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static" color='primary'>
                <Container>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                {['left'].map((anchor) => (
                                    <React.Fragment key={anchor}>
                                        <MenuIcon onClick={toggleDrawer(anchor, true)}/>
                                        <SwipeableDrawer
                                            anchor={anchor}
                                            open={state[anchor]}
                                            onClose={toggleDrawer(anchor, false)}
                                            onOpen={toggleDrawer(anchor, true)}
                                        >
                                            {list(anchor)}
                                        </SwipeableDrawer>
                                    </React.Fragment>
                                ))}
                        </IconButton>
                        <Typography variant="h6" className={classes.mainLink} component={NavLink} to='/' exact>
                            Caravan
                        </Typography>
                        <ToolBar/>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Navigation;