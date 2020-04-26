import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, editUser, getUser, getUserSuccess} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../components/UI/Form/FormElement";
import MuiPhoneNumber from "material-ui-phone-number";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DeleteIcon from '@material-ui/icons/Delete';

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

const EditUser = props => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const editClient = useSelector(state => state.users.client);

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        dispatch(getUser(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const error = useSelector(state => state.users.error);

    const removeUser = async () => {
        await dispatch(deleteUser(props.match.params.id))
    };

    const inputChangeHandler = e => dispatch(getUserSuccess({...editClient, [e.target.name]: e.target.value}));
    const phoneChangeHandler = value => dispatch(getUserSuccess({...editClient, phone: value}));
    const fileChangeHandler = e => dispatch(getUserSuccess({...editClient, [e.target.name]: e.target.files[0]}));
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const roles = ['admin', 'courier', 'operator', 'market'];

    const onSubmit = e => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(editClient).forEach(value => {
            data.append(value, editClient[value])
        });
        dispatch(editUser(data, props.match.params.id))
    };

    return (
        <Container>
            <Grid style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            Редактирование пользователя
                        </Typography>
                    </Box>
                    <form onSubmit={onSubmit}>
                        {editClient && <Grid container direction='column' spacing={1}>
                            <Grid item>
                                <FormElement
                                    required
                                    propertyName='username'
                                    title='Логин'
                                    value={editClient.username}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    propertyName='password'
                                    title='Пароль'
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    propertyName='displayName'
                                    title='Отображаемое имя'
                                    value={editClient.displayName}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    propertyName='role'
                                    title='Роль'
                                    value={editClient.role}
                                    onChange={inputChangeHandler}
                                    type='select'
                                    options={roles}
                                />
                            </Grid>
                            {editClient.role === 'market' && <>
                                <Grid item>
                                    <FormElement
                                        propertyName='companyName'
                                        title='Название компании'
                                        value={editClient.companyName}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormElement
                                        propertyName='address'
                                        title='Адрес компании'
                                        value={editClient.address}
                                        onChange={inputChangeHandler}
                                    />
                                </Grid>
                            </>}
                            <Grid item>
                                <FormElement
                                    propertyName='avatar'
                                    title='avatar'
                                    value={editClient.avatar}
                                    onChange={fileChangeHandler}
                                    type='file'
                                />
                            </Grid>
                            <Grid item>
                                <MuiPhoneNumber
                                    required
                                    className={classes.phoneInput}
                                    defaultCountry={'kg'}
                                    value={editClient.phone}
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
                                        Редактировать
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon/>}
                                    onClick={handleClickOpen}
                                    id='deleteUser'
                                >
                                    Удалить пользователя
                                </Button>
                            </Grid>
                        </Grid>}
                    </form>
                </Box>
            </Grid>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Вы уверены что хотите удалить этого пользователя?</DialogTitle>
                <DialogContent>
                    {error && <Box mb={1}>
                        <Alert severity="error">{error}</Alert>
                    </Box>}
                    <Grid container justify='flex-end' spacing={1}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClose}
                            >нет</Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={removeUser}
                                id='yes'
                            >да</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default EditUser;