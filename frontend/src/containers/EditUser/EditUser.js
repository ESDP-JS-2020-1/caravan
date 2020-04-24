import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import {editUser, getEditUsers} from "../../store/actions/usersActions";
import InputLabel from "@material-ui/core/InputLabel";

const styles = {
    fontSize: '20px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '200px',
    background: 'white',
    padding: '10px'
};

const ROLES = ['market', 'courier', 'admin', 'operator'];

const EditUser = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEditUsers(props.match.params.id));
    }, [dispatch]);
    const user = useSelector(state => state.users.editUser);
    const [state, setState] = useState(user);

    const editProfile = () => {
        const User = new FormData();
        User.append('avatar', state.avatar);
        User.append('displayName', state.displayName);
        User.append('password', state.password);
        User.append('role', state.role);
        User.append('username', state.username);
        User.append('marketName', state.marketName);
        User.append('address', state.address);
        dispatch(editUser(User));
    };

    const changeInputHandler = e => {
        setState({...state, [e.target.name]: e.target.value})
    };
    const changeFileHandler = e => {
        setState({...state, [e.target.name]: e.target.files[0]})
    };
    return  (
        <Grid container justify="center">
            <Grid item xs={12} md={10} lg={4}>
                <Box ml={4}>
                    <Box pt={2} pb={2}>
                        <Typography variant="h4">Edit User</Typography>
                    </Box>
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs>
                            <TextField type="text"
                                       value={state.username}
                                       name="username"
                                       variant="outlined"
                                       label="Change username"
                                       onChange={changeInputHandler}
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField type="text"
                                       value={state.displayName}
                                       name="displayName"
                                       label="Change display name"
                                       variant="outlined"
                                       onChange={changeInputHandler}
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField type="text"
                                       label="password"
                                       name="password"
                                       variant="outlined"
                                       onChange={changeInputHandler}
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField type="file"
                                       name="avatar"
                                       variant="outlined"
                                       onChange={changeFileHandler}
                                       fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <select name="role" value={state.role} onChange={changeInputHandler} style={styles}>
                                {ROLES.map(role => (
                                    <option value={role} key={role}>{role}</option>
                                ))}
                            </select>
                        </Grid>
                        {state.role === 'market' && (
                            <>
                                <Grid item xs>
                                    <TextField type="text"
                                               label="address"
                                               name="address"
                                               variant="outlined"
                                               onChange={changeInputHandler}
                                               fullWidth
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField type="text"
                                               label="market name"
                                               name="marketName"
                                               variant="outlined"
                                               onChange={changeInputHandler}
                                               fullWidth
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs>
                            <Button color="primary" variant="contained"
                                    onClick={editProfile}>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default EditUser;