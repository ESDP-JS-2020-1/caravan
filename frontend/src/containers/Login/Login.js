import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import FormElement from "../../components/UI/Form/FormElement";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Spinner from "../../components/UI/Spinner/Spinner";
import {makeStyles} from "@material-ui/core/styles";

const useSStyles = makeStyles({
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
    }
})

const Login = () => {

    const classes = useSStyles();

    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const error = useSelector(state => state.users.loginError);
    const loading = useSelector(state => state.users.loginLoading);

    const dispatch = useDispatch();

    const inputChangeHandler = event => setState({...state, [event.target.name]: event.target.value});

    const submitFormHandler = event => {
        event.preventDefault();

        dispatch(loginUser(state))
    };

    return (
        <Container>
            <Grid style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.text} variant="h6" gutterBottom>
                            Login
                        </Typography>
                    </Box>
                    <form onSubmit={submitFormHandler}>
                        <FormElement
                            required
                            propertyName="username"
                            title="Username"
                            value={state.username}
                            onChange={inputChangeHandler}
                            type="text"
                            autoComplete="current-username"
                            placeholder="Enter username you registered with"
                        />
                        <FormElement
                            required
                            propertyName="password"
                            title="Password"
                            value={state.password}
                            onChange={inputChangeHandler}
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter password"
                        />
                        <Box>
                            {error && (
                                <Alert severity="error">{error.message}</Alert>
                            )}
                        </Box>
                        <Box component="span" className={classes.formBtn}>
                            {loading ? (<Spinner classsName={classes.button}/>) : (
                                <Button className={classes.button} variant="contained" type="submit" color="primary"
                                        id="btn">Sign in</Button>
                            )}
                        </Box>
                    </form>
                </Box>
            </Grid>
        </Container>
    );
}

export default Login;