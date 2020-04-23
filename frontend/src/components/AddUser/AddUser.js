import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormElement from "../UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {addUser} from "../../store/actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@material-ui/lab/Alert";
import MuiPhoneNumber from 'material-ui-phone-number'

const AddUser = () => {

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

    const dispatch = useDispatch()

    const error = useSelector(state => state.users.error);

    const inputChangeHandler = e => setUser({...user, [e.target.name]: e.target.value});
    const phoneChangeHandler = value => setUser({...user, phone: value});
    const fileChangeHandler = e => setUser({...user, [e.target.name]: e.target.files[0]});

    const roles = ['admin', 'courier', 'operator', 'market']

    const onSubmit = e => {
        e.preventDefault()

        const data = new FormData();
        Object.keys(user).map(value => {
            data.append(value, user[value])
        })
        dispatch(addUser(data))
    }

    return (
        <Box mt={2}>
            <form onSubmit={onSubmit}>
                <Grid container direction='column' spacing={1}>
                    <Grid item>
                        <Typography variant='h4'>
                            Добавление нового пользователя
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormElement
                            propertyName='username'
                            title='имя пользователя'
                            value={user.username}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid item>
                        <FormElement
                            propertyName='password'
                            title='пароль'
                            value={user.password}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid item>
                        <FormElement
                            propertyName='displayName'
                            title='отображаемое имя'
                            value={user.displayName}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid item>
                        <FormElement
                            propertyName='role'
                            title='роль'
                            value={user.role}
                            onChange={inputChangeHandler}
                            type='select'
                            options={roles}
                        />
                    </Grid>
                    {user.role === 'market' && <>
                        <Grid item>
                            <FormElement
                                propertyName='companyName'
                                title='название компании'
                                value={user.companyName}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid item>
                            <FormElement
                                propertyName='address'
                                title='адрес компании'
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
                            defaultCountry={'kg'}
                            onChange={phoneChangeHandler}
                        />
                    </Grid>
                    {error && <Grid item>
                        <Alert severity='error'>{error}</Alert>
                    </Grid>}
                    <Grid item>
                        <Button variant='contained' color='primary' type='submit'>Добавить</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddUser;