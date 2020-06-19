import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {MuiThemeProvider} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import {getUser} from "../../store/actions/usersActions";
import {Map, Marker, TileLayer} from "react-leaflet";
import {wordList} from "../../wordList";
import Spinner from "../../components/UI/Spinner/Spinner";
import {NavLink} from "react-router-dom";

import {apiURL} from "../../config";


const useStyles = makeStyles({
    flex: {
        display: 'flex',
    },
    typography: {
        color: '#0d47a1',
        textAlign: 'center',
    },
    typographyText: {
        borderBottom: '2px solid #0d47a1',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: '3%',
    },
    paper: {
        width: '70%',
        padding: '20px',
        margin: '0 auto',
        marginTop: '5%'
    },
    avatar: {
        width: '50%'
    },
    avatarImage: {
        width: '100%'
    }
});

const UserInfo = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.users.client);
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getUser(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    const theme = createMuiTheme({
        overrides: {
            MuiTypography: {
                root: {
                    margin: "7px",
                    padding: "10px"
                }
            }
        }
    });
    let coord = userInfo && userInfo.market && userInfo.market.coordinates;

    const loading = useSelector(state => state.loading.loading)
    if (loading) {
        return <Spinner/>
    }

    return (
        <Container>
            <Paper className={classes.paper} elevation={3}>
                <MuiThemeProvider theme={theme}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            {wordList[language].userInfo.userInfoTitle}
                        </Typography>
                    </Box>
                    {userInfo && <>
                        {userInfo.avatar && <div className={classes.avatar}>
                            <Paper>
                                <img
                                    src={apiURL.url+'/uploads/userAvatar/'+userInfo.avatar}
                                    className={classes.avatarImage}
                                    alt={userInfo.displayName}
                                />
                            </Paper>
                        </div>}
                        <Typography variant='h5'> <b>{wordList[language].userInfo.userInfoRole} </b>{userInfo.role}
                        </Typography>

                        <Typography variant='h5'>
                            <b>{wordList[language].userInfo.userInfoName} </b>{userInfo.displayName}</Typography>

                        <Typography variant='h5'><b>{wordList[language].userInfo.userInfoPhone} </b>{userInfo.phone}
                        </Typography>

                        {userInfo.groups[0] && <>
                            <Divider/>

                            <Typography variant='h5'><b> Список групп </b>
                            </Typography>
                            <ul>
                                {userInfo.groups.map(group => (
                                    <li key={group._id}>
                                        <NavLink to={'/groups/' + group._id} style={{textDecoration: 'none'}}>
                                            {group.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>

                            <Divider/>

                            <Typography variant='h5'><b> Список разрешений </b>
                            </Typography>
                            <ul>
                                {userInfo.permissions.map((permission, id) => (
                                    <li key={id}>
                                        {permission}
                                    </li>
                                ))}
                            </ul>
                        </>}

                        <Divider/>
                        {userInfo.role === 'market' && <>
                            <Typography
                                variant='h5'><b>{wordList[language].userInfo.userInfoMarket} </b>{userInfo.market.companyName}
                            </Typography>

                            <Typography
                                variant='h5'><b>{wordList[language].userInfo.userInfoAddress} </b>{userInfo.market.address}
                            </Typography>

                            <Typography
                                variant='h5'><b>{wordList[language].userInfo.userInfoCoord} </b>lat: {coord.lat} ,
                                lng: {coord.lng}</Typography>

                            {coord.lat && <div style={{height: '300px'}}>
                                <Map center={[coord.lat, coord.lng]} zoom={10}
                                     style={{background: '#000', height: '100%', width: '100%'}}>
                                    <TileLayer
                                        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                                    />

                                    <Marker position={[coord.lat, coord.lng]}/>
                                </Map>
                            </div>}

                        </>}

                        {userInfo.role === 'courier' && <>
                            <Typography
                                variant='h5'><b>{wordList[language].userInfo.userInfoCar} </b>{userInfo.courier.carName}
                            </Typography>

                            <Typography
                                variant='h5'><b>{wordList[language].userInfo.userInfoCarVolume} </b>{userInfo.courier.carVolume}
                            </Typography>

                            <Typography variant='h5'><b>
                                {wordList[language].userInfo.userInfoFridge}
                            </b> {userInfo.courier.carRefrigerator ?
                                (wordList[language].userInfo.fridgeAvail)
                                : (wordList[language].userInfo.fridgeNotAvail)}
                            </Typography>
                            <Divider/>
                        </>}
                    </>}
                </MuiThemeProvider>
            </Paper>
        </Container>
    );
};

export default UserInfo;