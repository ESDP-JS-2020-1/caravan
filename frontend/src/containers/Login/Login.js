import React, {useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

import FormElement from "../../components/UI/Form/FormElement";
import {loginUser} from "../../store/actions/usersActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import {wordList} from "../../wordList";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import OutlinedInput from "@material-ui/core/OutlinedInput";


const useStyles = makeStyles({
    formBtn: {
        marginTop: '1%',
        display: 'block',
        textAlign: 'center',
    },
    button: {
        fontWeight: 'bold',
        width: '100%',
        minHeight: '50px'
    },
    typography: {
        color: '#0d47a1',
        textAlign: 'center',
    },
    text: {
        borderBottom: '2px solid #0d47a1',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: '3%',
    },
    gridItem: {
        margin: '0 auto',
        marginTop: '5%'
    },
    inputInput: {
        width: '100%'
    }
});

const Login = () => {

    const classes = useStyles();

    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setShowPassword({ ...showPassword, showPassword: !showPassword.showPassword });
    };

    const error = useSelector(state => state.users.error);
    const language = useSelector(state => state.language.name);

    const dispatch = useDispatch();

    const inputChangeHandler = event => setState({...state, [event.target.name]: event.target.value});

    const submitFormHandler = event => {
        event.preventDefault();

        dispatch(loginUser(state))
    };

    const loading = useSelector(state => state.loading.loading);
    if (loading) {
        return <Spinner/>
    }

    return (
        <Container>
            <Grid className={classes.gridItem} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.text} variant="h6" gutterBottom>
                            {wordList[language].login.loginTitle}
                        </Typography>
                    </Box>
                    <form onSubmit={submitFormHandler}>
                        <FormElement
                            required
                            propertyName="username"
                            title={wordList[language].login.userTitle}
                            value={state.username}
                            onChange={inputChangeHandler}
                            type="text"
                            autoComplete="current-username"
                            placeholder={wordList[language].login.usernamePlaceholder}
                        />
                        <OutlinedInput
                            className={classes.inputInput}
                            variant="outlined"
                            required
                            name="password"
                            placeholder={wordList[language].login.password}
                            type={showPassword.showPassword ? 'text' : 'password'}
                            value={state.password}
                            onChange={inputChangeHandler}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <Box>
                            {error && (
                                <Alert severity="error">{error.message}</Alert>
                            )}
                        </Box>
                        <Box component="span" className={classes.formBtn}>
                            {loading ? (<Spinner classsName={classes.button}/>) : (
                                <Button className={classes.button} variant="contained" type="submit" color="primary"
                                        id="btn2">{wordList[language].login.loginBtn}</Button>
                            )}
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Container>
    );
};

export default Login;