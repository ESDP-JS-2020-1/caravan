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
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LeafletMap from "../../components/LeafletMap/LeafletMap";
import {wordList} from "../../wordList";
import {apiURL} from "../../config";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '800px',
        width: '100%'
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
        height: '100%',
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

    const [center, setCenter] = useState([42.8746, 74.5698]);
    const [zoom, setZoom] = useState(12);
    const [tracking, setTracking] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    const user = useSelector(state => state.users.user);
    const usersOnline = useSelector(state => state.users.usersOnline);
    const coordinate = useSelector(state => state.users.coordinate);
    const language = useSelector(state => state.language.name);
    const dispatch = useDispatch();

    const trackUser = data => {
        const orderData = data.user.currentRequest;
        let currentShop = orderData.user.market;
            currentShop = [currentShop.coordinates.lat, currentShop.coordinates.lng];
        setCenter([data.location.lat, data.location.lng]);
        setZoom(10);
        setTracking(true);
        if (Object.keys(orderData).length > 0) {
            const currentUser = data.user._id;
            setCurrentOrder({
                user: currentUser,
                shop: currentShop
            })
        }
    };

    useEffect(() => {
        const webSocket = new WebSocket(apiURL.wsUrl);
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
                    {wordList[language].wsTest.couriers}
                </Typography>
                {currentOrder && <>
                    <Divider/>
                    <Button variant="contained" color="secondary" onClick={() => setCurrentOrder(null)}>
                        Отменить отслеживание
                    </Button>
                </>}
                <Divider/>
                <div className={classes.drawerContainer}>
                    <List>
                        {usersOnline && usersOnline.map((item, index) => {
                            const hasRequest = Object.keys(item.currentRequest).length > 0;

                            return (
                                <ListItem
                                    button
                                    key={item._id}
                                >
                                    <Grid container spacing={1}>
                                        <Grid
                                            container
                                            item
                                            component={NavLink}
                                            to={`/users/${item._id}`}
                                            alignItems='center'
                                            className={classes.linkToUser}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={item.avatar ? 'http://localhost:8000/uploads/userAvatar/' + item.avatar : ""}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText primary={item.displayName} />
                                        </Grid>
                                        {hasRequest && coordinate?.[index] && <Grid item xs>
                                            <Button className={classes.trackUser} onClick={() => trackUser(coordinate?.[index])}>
                                                {wordList[language].wsTest.toSeeCouriersBtn}
                                            </Button>
                                        </Grid>}
                                    </Grid>
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            </div>
            <main className={classes.content}>
                { currentOrder === null && !coordinate && <LeafletMap/> }

                { currentOrder === null && coordinate && coordinate.length > 0 && <LeafletMap
                    type={'locations'}
                    locations={coordinate}
                /> }

                { currentOrder !== null && coordinate && coordinate.length > 0 &&  <>
                    <LeafletMap
                        type={'routing'}
                        myLocation={currentOrder.user}
                        to={currentOrder.shop}
                        locations={coordinate}
                    />
                </>}
            </main>
        </div>
    );
};

export default WsTest;