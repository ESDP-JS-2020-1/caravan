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
        width: 250,
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
    const ProductsList = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/products">Products list</NavLink>);
    const CreateNewRequest = (<NavLink style={{textDecoration: 'none', color: 'black'}} to="/requests/new">Products list</NavLink>);
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