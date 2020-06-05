import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import MuiPhoneNumber from 'material-ui-phone-number'
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import FormElement from "../../components/UI/Form/FormElement";
import {addUser} from "../../store/actions/usersActions";
import MapDisplay from "../Map/DeviceMap";
import {wordList} from "../../wordList";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import {getGroups} from "../../store/actions/groupActions";

const useStyles = makeStyles({
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
    },
    formControlLabel: {
        marginLeft: '0px'
    },
    boxMapDisplay: {
        width: '100%',
        height: '410px'
    }
});

const AddUser = () => {
    const classes = useStyles();
    const coordinate = useSelector(state => state.users.coordinates);
    const [user, setUser] = useState({
        username: '',
        password: '',
        displayName: '',
        role: '',
        phone: '',
        avatar: null,
        companyName: '',
        address: '',
        carName: '',
        carVolume: '',
        carRefrigerator: false,
        coordinates: {}
    });
    const [group, setGroup] = useState({
        group: ''
    });

    const dispatch = useDispatch();
    const error = useSelector(state => state.users.error);
    const groups = useSelector(state => state.groups.groups);

    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getGroups())
    }, [dispatch]);

    const groupArray = [];
    groups.forEach(group => {
        groupArray.push(group.name)
    });

    const inputChangeHandler = e => setUser({...user, [e.target.name]: e.target.value});
    const checkboxChangeHandler = e => setUser({...user, carRefrigerator: e.target.checked});
    const phoneChangeHandler = value => setUser({...user, phone: value});
    const fileChangeHandler = e => setUser({...user, [e.target.name]: e.target.files[0]});
    const permissionsChangeHandler = (e, group) => {setGroup(JSON.stringify(group))};

    const roles = ['admin', 'courier', 'operator', 'market'];

    const onSubmit = e => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(user).forEach(value => {
            if (value === 'coordinates') {
                data.append(value, JSON.stringify(coordinate))
            } else {
                data.append(value, user[value])
            }
        });
        data.append('group', group);
        dispatch(addUser(data))
    };

    return (
        <Container>
            <Grid className={classes.gridItem} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            {wordList[language].addUser.addUserTitle}
                        </Typography>
                    </Box>
                    <form onSubmit={onSubmit}>
                        <Grid container direction='column' spacing={1}>
                            <Grid item>
                                <FormElement
                                    id='username'
                                    error={error}
                                    helperText={error && error.keyValue['username'] ? `Пользователь с таким логином уже существует` : ''}
                                    required
                                    propertyName='username'
                                    title={wordList[language].addUser.inputLogin}
                                    value={user.username}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    id='password'
                                    required
                                    propertyName='password'
                                    title={wordList[language].addUser.inputPassword}
                                    value={user.password}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    id='displayName'
                                    propertyName='displayName'
                                    title={wordList[language].addUser.inputName}
                                    value={user.displayName}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    propertyName='role'
                                    title={wordList[language].addUser.inputRole}
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
                                        title={wordList[language].addUser.inputCarName}
                                        value={user.carName}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>

                                <Grid item>
                                    <FormElement
                                        id='carVolume'
                                        propertyName='carVolume'
                                        title={wordList[language].addUser.inputCarVolume}
                                        value={user.carVolume}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>

                                <FormControlLabel
                                    className={classes.formControlLabel}
                                    control={
                                        <Checkbox
                                            id='carRefrigerator'
                                            checked={user.carRefrigerator}
                                            value={user.carRefrigerator}
                                            onChange={checkboxChangeHandler}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                        />
                                    }
                                    label={wordList[language].addUser.inputRefrigerator}
                                />
                            </>}
                            {user.role === 'market' && <>
                                <Grid item>
                                    <FormElement
                                        id='companyName'
                                        propertyName='companyName'
                                        title={wordList[language].addUser.inputCompanyName}
                                        value={user.companyName}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormElement
                                        id='address'
                                        propertyName='address'
                                        title={wordList[language].addUser.inputCompanyAddress}
                                        value={user.address}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>
                                {coordinate && <Grid item>
                                    <FormElement
                                        disabled
                                        id='coordinates'
                                        propertyName='coordinates'
                                        title={wordList[language].addUser.inputCoordinates}
                                        value={coordinate.lat + ' ' + coordinate.lng}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>}
                                <Box className={classes.boxMapDisplay}>
                                    <MapDisplay/>
                                </Box>
                            </>}
                            <Grid item>
                                <FormElement
                                    propertyName='avatar'
                                    title={wordList[language].addUser.inputAvatar}
                                    value={user.avatar}
                                    onChange={fileChangeHandler}
                                    type='file'
                                />
                            </Grid>
                            <Grid item>
                                <MuiPhoneNumber
                                    id='phone'
                                    required
                                    className={classes.phoneInput}
                                    defaultCountry={'kg'}
                                    onChange={phoneChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    options={groupArray}
                                    multiple
                                    onChange={permissionsChangeHandler}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" label="Добавить в группы"/>
                                    )}
                                />
                            </Grid>
                            {error && <Grid item>
                                <Alert severity='error'>{'Произошла ошибка!'}</Alert>
                            </Grid>}
                            <Grid item>
                                <Box className={classes.formBtn} component="span">
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                    >
                                        {wordList[language].addUser.addBtn}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Container>
    );
};

export default AddUser;