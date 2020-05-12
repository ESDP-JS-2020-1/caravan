import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {getUser} from "../../store/actions/usersActions";
import {MuiThemeProvider} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {Map, Marker, TileLayer} from "react-leaflet";

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
    }
});

const UserInfo = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.users.client);

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
    const coord = userInfo && userInfo.market.coordinates;

    return (
        <Container>
            <Paper className={classes.paper} elevation={3}>
                <MuiThemeProvider theme={theme}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            Информация о пользователе
                        </Typography>
                    </Box>
                    {userInfo && <>
                        <Typography variant='h5'> <b>Роль </b>{userInfo.role}</Typography>

                        <Typography variant='h5'> <b>Пользователь </b>{userInfo.displayName}</Typography>

                        <Typography variant='h5'><b>Телефон </b>{userInfo.phone}</Typography>
                        <Divider/>

                        {userInfo.role === 'market' && <>
                            <Typography variant='h5'><b>Магазин </b>{userInfo.market.companyName}</Typography>

                            <Typography variant='h5'><b>Адрес </b>{userInfo.market.address}</Typography>

                            <Typography variant='h5'><b>Координаты </b>lat: {coord.lat} , lng: {coord.lng}</Typography>

                            <div style={{height: '300px'}}>
                                <Map center={[coord.lat, coord.lng]} zoom={10} style={{background: '#000',height : '100%', width: '100%'}}>
                                    <TileLayer
                                        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                                    />

                                    <Marker position={[coord.lat, coord.lng]}/>
                                </Map>
                            </div>

                            </>}

                        {userInfo.role === 'courier' && <>
                            <Typography variant='h5'><b>Машина </b>{userInfo.courier.carName}</Typography>

                            <Typography variant='h5'><b>Объем машины </b>{userInfo.courier.carVolume}</Typography>

                            <Typography variant='h5'><b>Наличие холодильника </b>{userInfo.courier.carRefrigerator ? 'Есть' : 'Отсутствует'}</Typography>
                            <Divider/>
                        </>}
                    </>}
                </MuiThemeProvider>
            </Paper>
        </Container>
    );
};

export default UserInfo;