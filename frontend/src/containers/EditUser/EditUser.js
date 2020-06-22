import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MuiPhoneNumber from "material-ui-phone-number";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import {deleteUser, editUser, getUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormElement";
import Modal from "../../components/UI/Modal/Modal";
import {wordList} from "../../wordList";
import {Map, Marker, TileLayer} from "react-leaflet";


const useStyles = makeStyles(() => ({
    formBtn: {
        marginTop: '1%',
        display: 'block',
        textAlign: 'center',
    },
    formButton: {
        fontWeight: 'bold',
        width: '100%',
        minHeight: '50px'
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
    phoneInput: {
        width: '100%',
    },
    gridItem: {
        margin: '0 auto',
        marginTop: '5%'
    }
}));

const EditUser = props => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const editClient = useSelector(state => state.users.client);
    const language = useSelector(state => state.language.name);

    const [open, setOpen] = React.useState(false);

    const [user, setUser] = React.useState(undefined);
    const [coordinate, setCoordinate] = useState({lat: '', lng: ''});

    useEffect(() => {
        dispatch(getUser(props.match.params.id))
    }, [dispatch, props.match.params.id])

    useEffect(() => {
        if (editClient !== undefined) {
            if (editClient._id === props.match.params.id && user === undefined) {
                setUser(() => editClient)
            }
            if (editClient.role === 'market') setCoordinate(() => editClient.market.coordinates);
        }
    }, [dispatch, editClient, user, props.match.params.id]);

    const error = useSelector(state => state.users.error);

    const removeUser = async () => {
        dispatch(deleteUser(props.match.params.id))
    };

    const checkboxChangeHandler = e => setUser({
        ...user,
        courier: {...user.courier, carRefrigerator: e.target.checked}
    });
    const inputChangeHandler = e => {
        if (e.target.name === 'role' && e.target.value === 'market' && !user.market) {
            return setUser({...user, [e.target.name]: e.target.value, market: {companyName: '', address: ''}});
        } else if (e.target.name === 'role' && e.target.value === 'courier' && !user.courier) {
            return setUser({
                ...user,
                [e.target.name]: e.target.value,
                courier: {carName: '', carVolume: '', carRefrigerator: false}
            });
        }

        setUser({...user, [e.target.name]: e.target.value});
    }

    const marketChangeHandler = e => setUser({...user, market: {...user.market, [e.target.name]: e.target.value}});
    const courierChangeHandler = e => setUser({...user, courier: {...user.courier, [e.target.name]: e.target.value}});

    const phoneChangeHandler = value => setUser({...user, phone: value});
    const fileChangeHandler = e => setUser({...user, [e.target.name]: e.target.files[0]});

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const roles = ['admin', 'courier', 'operator', 'market'];

    const onSubmit = e => {
        e.preventDefault();
        const userInfo = {...user};
        if (userInfo.role === 'market') {
            delete userInfo.courier
        } else if (userInfo.role === 'courier') {
            delete userInfo.market
        }
        const data = new FormData();
        Object.keys(userInfo).forEach(value => {
            if (value === 'courier') {
                return Object.keys(userInfo.courier).forEach(courier => data.append(courier, userInfo.courier[courier]))
            }
            if (value === 'market') {
                return Object.keys(userInfo.market).forEach(market => data.append(market, userInfo.market[market]))
            }
            data.append(value, userInfo[value])
        });
        data.append('lat', coordinate.lat);
        data.append('lng', coordinate.lng);
        dispatch(editUser(data, props.match.params.id))
    };

    const addMarker = (event) => {
        if (event.originalEvent.target.id !== 'select') {
            setCoordinate({...coordinate, lat: event.latlng.lat, lng: event.latlng.lng});
        }
    };

    return (
        <Container>
            <Grid className={classes.gridItem} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            {wordList[language].editUser.editUserTitle}
                        </Typography>
                    </Box>
                    {editClient && <form onSubmit={onSubmit}>
                        {user && <Grid container direction='column' spacing={1}>
                            <Grid item>
                                <FormElement
                                    id="username"
                                    required
                                    propertyName='username'
                                    title={wordList[language].editUser.inputLogin}
                                    value={user.username}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    id="password"
                                    propertyName='password'
                                    title={wordList[language].editUser.inputPassword}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    id="displayName"
                                    propertyName='displayName'
                                    title={wordList[language].editUser.inputName}
                                    value={user.displayName}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    propertyName='role'
                                    title={wordList[language].editUser.inputRole}
                                    value={user.role}
                                    onChange={inputChangeHandler}
                                    type='select'
                                    options={roles}
                                />
                            </Grid>
                            {user.role === 'courier' && <>
                                <Grid item>
                                    <FormElement
                                        id='carName'
                                        propertyName='carName'
                                        title={wordList[language].editUser.inputCarName}
                                        defaultValue={user.courier.carName}
                                        onChange={courierChangeHandler}
                                    />
                                </Grid>

                                <Grid item>
                                    <FormElement
                                        id='carVolume'
                                        propertyName='carVolume'
                                        title={wordList[language].editUser.inputCarVolume}
                                        defaultValue={user.courier.carVolume}
                                        onChange={courierChangeHandler}
                                    />
                                </Grid>

                                <FormControlLabel
                                    style={{marginLeft: '0px'}}
                                    control={
                                        <Checkbox
                                            id='carRefrigerator'
                                            checked={user.courier ? user.courier.carRefrigerator : false}
                                            value={user.courier ? user.courier.carRefrigerator : false}
                                            onChange={checkboxChangeHandler}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                        />
                                    }
                                    label={wordList[language].editUser.inputRefrigerator}
                                />

                            </>}
                            {user.role === 'market' && <>
                                <Grid item>
                                    <FormElement
                                        propertyName='companyName'
                                        title={wordList[language].editUser.inputCompanyName}
                                        value={user.market.companyName}
                                        onChange={marketChangeHandler}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormElement
                                        propertyName='address'
                                        title={wordList[language].editUser.inputCompanyAddress}
                                        value={user.market.address}
                                        onChange={marketChangeHandler}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormElement
                                        disabled
                                        id='coordinates'
                                        propertyName='coordinates'
                                        title={wordList[language].addUser.inputCoordinates}
                                        value={coordinate.lat + ' ' + coordinate.lng}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>
                                <Grid>
                                    <div style={{height: '300px'}}>
                                        <Map onClick={addMarker}
                                             center={coordinate.lat ? [coordinate.lat, coordinate.lng] : [42.87658326294315, 74.6050579195933]}
                                             zoom={11} style={{background: '#000', height: '100%', width: '100%'}}>
                                            <TileLayer
                                                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                                            />

                                            <Marker
                                                position={coordinate.lat ? [coordinate.lat, coordinate.lng] : [42.87658326294315, 74.6050579195933]}/>
                                        </Map>
                                    </div>
                                </Grid>
                            </>}
                            <Grid item>
                                <FormElement
                                    propertyName='avatar'
                                    title={wordList[language].editUser.inputAvatar}
                                    value={user.avatar}
                                    onChange={fileChangeHandler}
                                    type='file'
                                />
                            </Grid>
                            <Grid item>
                                <MuiPhoneNumber
                                    id="phone"
                                    required
                                    className={classes.phoneInput}
                                    defaultCountry={'kg'}
                                    value={user.phone}
                                    onChange={phoneChangeHandler}
                                />
                            </Grid>
                            {error && editClient && <Grid item>
                                <Alert severity='error'>{error}</Alert>
                            </Grid>}
                            <Grid item>
                                <Box className={classes.formBtn} component="span">
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                    >
                                        {wordList[language].editUser.editBtn}
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon/>}
                                    onClick={handleClickOpen}
                                    id="deleteUser"
                                >
                                    {wordList[language].editUser.deleteBtn}
                                </Button>
                            </Grid>
                        </Grid>}
                    </form>}
                </Box>
            </Grid>
            <Modal onClose={handleClose} open={open} title={wordList[language].editUser.modalDeleteTitle}>
                {error && <Box mb={1}>
                    <Alert severity="error">{error}</Alert>
                </Box>}
                <Grid container justify='flex-end' spacing={1}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                        >{wordList[language].editUser.modalBtnNeg}</Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={removeUser}
                            id='yes'
                        >{wordList[language].editUser.modalBtnPos}</Button>
                    </Grid>
                </Grid>
            </Modal>
        </Container>
    );
};

export default EditUser;