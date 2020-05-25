import React from 'react';

import {NavLink} from 'react-router-dom'
import {useSelector} from "react-redux";
import clsx from 'clsx';

import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from '@material-ui/core/ListItemText';
import GroupIcon from '@material-ui/icons/Group';
import DescriptionIcon from '@material-ui/icons/Description';
import HistoryIcon from '@material-ui/icons/History';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Hidden from "@material-ui/core/Hidden";
import PostAddIcon from '@material-ui/icons/PostAdd';

import ToolBar from "../UI/toolBar/toolBar";
import {wordList} from "../../wordList";
import Avatar from "@material-ui/core/Avatar";
import caravan from './logo.png';

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
    avatar: {
        width: "180px",
        height: "50px"
    }
}));


const Navigation = () => {

    const classes = useStyles();

    const user = useSelector(state => state.users.user);
    const language = useSelector(state => state.language.name);

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });


    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
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
            <NavLink style={{textDecoration: 'none', color: 'black'}} to="/requests/new">
                <List>
                    <ListItem button>
                        <ListItemIcon>{<PostAddIcon/>}</ListItemIcon>
                        <ListItemText>{wordList[language].authUserToolBar.requestBtn}</ListItemText>
                    </ListItem>
                </List>
            </NavLink>
            {user && user.role === 'admin' && (
                <NavLink style={{textDecoration: 'none', color: 'black'}} to="/groups">
                    <List>
                        <ListItem button>
                            <ListItemIcon>{<PeopleAltIcon/>}</ListItemIcon>
                            <ListItemText>{wordList[language].navigation.groupList}</ListItemText>
                        </ListItem>
                    </List>
                </NavLink>
            )}
            {user && user.role === 'admin' && (
                <NavLink style={{textDecoration: 'none', color: 'black'}} to="/users">
                    <List>
                        <ListItem button>
                            <ListItemIcon>{<GroupIcon/>}</ListItemIcon>
                            <ListItemText>{wordList[language].navigation.userList}</ListItemText>
                        </ListItem>
                    </List>
                </NavLink>
            )}
            <NavLink style={{textDecoration: 'none', color: 'black'}} to="/requests">
                <List>
                    <ListItem button>
                        <ListItemIcon>{<DescriptionIcon/>}</ListItemIcon>
                        <ListItemText>{wordList[language].navigation.requestList}</ListItemText>
                    </ListItem>
                </List>
            </NavLink>
            {user && user.role === 'admin' && (
                <NavLink style={{textDecoration: 'none', color: 'black'}} to="/history">
                    <List>
                        <ListItem button>
                            <ListItemIcon>{<HistoryIcon/>}</ListItemIcon>
                            <ListItemText>{wordList[language].navigation.historyList}</ListItemText>
                        </ListItem>
                    </List>
                </NavLink>
            )}
        </div>
    );


    return (
        <div className={classes.root}>
            <AppBar position="static" color='primary'>
                <Toolbar>
                    <Hidden mdUp>
                        {['left'].map((anchor) => (
                            <IconButton onClick={toggleDrawer(anchor, !state[anchor])} key={anchor} edge="start"
                                        className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon/>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    {list(anchor)}
                                </SwipeableDrawer>
                            </IconButton>
                        ))}
                    </Hidden>
                    <Typography variant="h6" className={classes.mainLink} component={NavLink} to='/' exact>
                        <Avatar src={caravan} className={classes.avatar} variant="square"/>
                    </Typography>
                    <ToolBar/>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;