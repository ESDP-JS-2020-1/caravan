import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {addUser} from "../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@material-ui/lab/Alert";
import MuiPhoneNumber from 'material-ui-phone-number'
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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
    }
});
const AddUser = () => {
    const classes = useStyles();

    const [user, setUser] = useState({
        username: '',
        password: '',
        displayName: '',
        role: '',
        phone: '',
        avatar: null,
        companyName: '',
        address: ''
    });

    const dispatch = useDispatch();

    const error = useSelector(state => state.users.error);

    const inputChangeHandler = e => setUser({...user, [e.target.name]: e.target.value});
    const phoneChangeHandler = value => setUser({...user, phone: value});
    const fileChangeHandler = e => setUser({...user, [e.target.name]: e.target.files[0]});

    const roles = ['admin', 'courier', 'operator', 'market'];

    const onSubmit = e => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(user).forEach(value => {
            data.append(value, user[value])
        });
        dispatch(addUser(data))
    };


    return (
        <Container>
            <Grid style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            Добавление нового пользователя
                        </Typography>
                    </Box>
                    <form onSubmit={onSubmit}>
                        <Grid container direction='column' spacing={1}>
                            <Grid item>
                                <FormElement
                                    id='username'
                                    required
                                    propertyName='username'
                                    title='Логин'
                                    value={user.username}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    id='password'
                                    required
                                    propertyName='password'
                                    title='Пароль'
                                    value={user.password}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    id='displayName'
                                    required
                                    propertyName='displayName'
                                    title='Отображаемое имя'
                                    value={user.displayName}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    required
                                    propertyName='role'
                                    title='Роль'
                                    value={user.role}
                                    onChange={inputChangeHandler}
                                    type='select'
                                    options={roles}
                                />
                            </Grid>
                            {user.role === 'market' && <>
                                <Grid item>
                                    <FormElement
                                        id='companyName'
                                        propertyName='companyName'
                                        title='Название компании'
                                        value={user.companyName}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormElement
                                        id='address'
                                        propertyName='address'
                                        title='Адрес компании'
                                        value={user.address}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>
                            </>}
                            <Grid item>
                                <FormElement
                                    propertyName='avatar'
                                    title='avatar'
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
                            {error && <Grid item>
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
                                        Добавить
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