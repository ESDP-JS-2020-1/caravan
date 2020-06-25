import React, {useEffect, useState} from 'react';
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
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
    linkToUser: {
        color: '#0c0c0c',
        textDecoration: 'none'
    },
    trackUser: {
        width: '100%'
    }
}));

const WsTest = () => {
    const classes = useStyles();

    const [center, setCenter] = useState([42.8746, 74.5698])
    const [zoom, setZoom] = useState(12)
    const [tracking, setTracking] = useState(false)
    const [shop, setShop] = useState(null)

    const user = useSelector(state => state.users.user);
    const usersOnline = useSelector(state => state.users.usersOnline);
    const coordinate = useSelector(state => state.users.coordinate);
    const dispatch = useDispatch();

    const trackUser = data => {
        const orderData = data.user.currentRequest;
        const currentShop = orderData.user.market;
        setCenter([data.location.lat, data.location.lng]);
        setZoom(10);
        setTracking(true);
        if (Object.keys(orderData).length > 0) {
            setShop(currentShop)
        }
    }

    useEffect(() => {
        const webSocket = new WebSocket(`ws://localhost:8000/locations?userRole=${user.role}`);

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
                        {coordinate && coordinate.map(item => {
                            return (
                                <ListItem
                                    button
                                    key={item.user._id}
                                >
                                    <Grid container spacing={1}>
                                        <Grid
                                            container
                                            item
                                            component={NavLink}
                                            to={`/users/${item.user._id}`}
                                            alignItems='center'
                                            className={classes.linkToUser}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={item.user.avatar ? 'http://localhost:8000/uploads/userAvatar/' + item.user.avatar : ""}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText primary={item.user.displayName} />
                                        </Grid>
                                        <Grid item xs>
                                            <Button className={classes.trackUser} onClick={() => trackUser(item)}>
                                                Отследить
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            </div>
            <main className={classes.content}>
                <Map center={center} zoom={zoom}
                     style={{background: '#000', height: '100%', width: '100%'}}>
                    <TileLayer
                        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    />

                    {shop && <Marker position={[shop.coordinates.lat, shop.coordinates.lng]}>
                        <Popup>
                            <span>{shop.companyName}</span>
                        </Popup>
                    </Marker>}

                    {coordinate && coordinate.map(c => {
                        return (
                            <Marker position={[c.location.lat, c.location.lng]}>
                                <Popup>
                                    <span>{c.user.displayName}</span>
                                </Popup>
                            </Marker>
                        )
                    })}
                </Map>
            </main>
        </div>
    );
};

export default WsTest;