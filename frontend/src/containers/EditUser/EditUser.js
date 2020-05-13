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
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "../../components/UI/Modal/Modal";
import {wordList} from "../../wordList";

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

    const [comment, setComment] = React.useState('');

    useEffect(() => {
        dispatch(getUser(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const error = useSelector(state => state.users.error);

    const removeUser = async () => {
        const remove = {
            comment: comment
        };
        await dispatch(deleteUser(props.match.params.id, remove))
    };

    const checkboxChangeHandler = e => dispatch(getUserSuccess({
        ...editClient,
        courier: {...editClient.courier, carRefrigerator: e.target.checked}
    }));
    const inputChangeHandler = e => dispatch(getUserSuccess({...editClient, [e.target.name]: e.target.value}));
    const phoneChangeHandler = value => dispatch(getUserSuccess({...editClient, phone: value}));
    const fileChangeHandler = e => dispatch(getUserSuccess({...editClient, [e.target.name]: e.target.files[0]}));
    const changeCommentInput = e => {
        setComment(e.target.value)
    };
    const changeMarket = (e) => {
        dispatch(getUserSuccess({...editClient, market: {...editClient.market, [e.target.name]: e.target.value}}))
    };
    const changeCourier = (e) => {
        dispatch(getUserSuccess({...editClient, courier: {...editClient.courier, [e.target.name]: e.target.value}}))
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const roles = ['admin', 'courier', 'operator', 'market'];

    const onSubmit = e => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(editClient).forEach(value => {
            if (value === 'courier') {
                data.append(value, JSON.stringify(editClient[value]))
            }
            if (value === 'market') {
                data.append(value, JSON.stringify(editClient[value]))
            }
            data.append(value, editClient[value])
        });
        data.append('comment', comment);
        dispatch(editUser(data, props.match.params.id))
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
                    <form onSubmit={onSubmit}>
                        {editClient && <Grid container direction='column' spacing={1}>
                            <Grid item>
                                <FormElement
                                    id="username"
                                    required
                                    propertyName='username'
                                    title={wordList[language].editUser.inputLogin}
                                    value={editClient.username}
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
                                    value={editClient.displayName}
                                    onChange={inputChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    propertyName='role'
                                    title={wordList[language].editUser.inputRole}
                                    value={editClient.role}
                                    onChange={inputChangeHandler}
                                    type='select'
                                    options={roles}
                                />
                            </Grid>
                            {editClient.role === 'courier' && <>
                                <Grid item>
                                    <FormElement
                                        id='carName'
                                        propertyName='carName'
                                        title={wordList[language].editUser.inputCarName}
                                        defaultValue={editClient.courier ? editClient.courier.carName : ''}
                                        onChange={changeCourier}
                                    />
                                </Grid>

                                <Grid item>
                                    <FormElement
                                        id='carVolume'
                                        propertyName='carVolume'
                                        title={wordList[language].editUser.inputCarVolume}
                                        defaultValue={editClient.courier ? editClient.courier.carVolume : ''}
                                        onChange={changeCourier}
                                    />
                                </Grid>

                                <FormControlLabel
                                    style={{marginLeft: '0px'}}
                                    control={
                                        <Checkbox
                                            id='carRefrigerator'
                                            checked={editClient.courier ? editClient.courier.carRefrigerator : false}
                                            value={editClient.courier ? editClient.courier.carRefrigerator : false}
                                            onChange={checkboxChangeHandler}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                        />
                                    }
                                    label={wordList[language].editUser.inputRefrigerator}
                                />

                            </>}
                            {editClient.role === 'market' && <>
                                <Grid item>
                                    <FormElement
                                        propertyName='companyName'
                                        title={wordList[language].editUser.inputCompanyName}
                                        value={editClient.market ? editClient.market.companyName : ''}
                                        onChange={changeMarket}
                                    />
                                </Grid>
                                <Grid item>
                                    <FormElement
                                        propertyName='address'
                                        title={wordList[language].editUser.inputCompanyAddress}
                                        value={editClient.market ? editClient.market.address : ''}
                                        onChange={changeMarket}
                                    />
                                </Grid>
                            </>}
                            <Grid item>
                                <FormElement
                                    propertyName='avatar'
                                    title={wordList[language].editUser.inputAvatar}
                                    value={editClient.avatar}
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
                                    value={editClient.phone}
                                    onChange={phoneChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    id="comment"
                                    propertyName='comment'
                                    title={wordList[language].editUser.inputEditComment}
                                    value={comment}
                                    onChange={changeCommentInput}
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
                    </form>
                </Box>
            </Grid>
            <Modal onClose={handleClose} open={open} title={wordList[language].editUser.modalDeleteTitle}>
                <Box ml={2} mr={2}>
                    <FormElement
                        id="comment"
                        propertyName='comment'
                        title={wordList[language].editUser.inputDeleteComment}
                        value={comment}
                        onChange={changeCommentInput}
                    />
                </Box>
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