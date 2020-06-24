import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from "react-redux";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import {NavLink} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import {Map, Marker, Popup, TileLayer} from "react-leaflet";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: window.innerHeight - 100
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    UsersTitle: {
        textAlign: 'center'
    },
}));

const WsTest = () => {
    const classes = useStyles();

    const user = useSelector(state => state.users.user);
    const usersOnline = useSelector(state => state.users.usersOnline);
    const coordinate = useSelector(state => state.users.coordinate);
    const dispatch = useDispatch();

    useEffect(() => {
        const webSocket = new WebSocket('ws://localhost:8000/locations');

        webSocket.onopen = () => {
            webSocket.send(JSON.stringify({type: 'CONNECT_USER', user}))
        };

        webSocket.onmessage = msg => {
            const action = JSON.parse(msg.data);
            dispatch(action)
        };

        return () => {
            webSocket.close()
        }

    }, [dispatch, user]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <div
                className={classes.drawer}
            >
                <Typography variant='h5' className={classes.UsersTitle}>
                    Курьеры в пути
                </Typography>
                <Divider/>
                <div className={classes.drawerContainer}>
                    <List>
                        {usersOnline && usersOnline.map(user => (
                            <ListItem
                                button
                                key={user._id}
                                component={NavLink}
                                to={`/users/${user._id}`}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={user.avatar ? 'http://localhost:8000/uploads/userAvatar/' + user.avatar : ""}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={user.displayName} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
            <main className={classes.content}>
                <Map center={[50, 70]} zoom={2}
                     style={{background: '#000', height: '100%', width: '100%'}}>
                    <TileLayer
                        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    />

                    {coordinate && coordinate.map(c => (
                        <Marker position={[c.location.lat, c.location.lng]}>
                            <Popup>
                                <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                            </Popup>
                        </Marker>
                    ))}
                </Map>
            </main>
        </div>
    );
};

export default WsTest;