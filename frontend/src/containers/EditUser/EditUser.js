import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import {deleteUser, editUser, getEditUsers} from "../../store/actions/usersActions";
import InputLabel from "@material-ui/core/InputLabel";
import {useParams} from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Alert from "@material-ui/lab/Alert";

const ROLES = ['market', 'courier', 'admin', 'operator'];

const EditUser = () => {

  const dispatch = useDispatch();
  const params = useParams();

  const user = useSelector(state => state.users);
  const error = useSelector(state => state.users.error)

  const [state, setState] = useState(null);
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    dispatch(getEditUsers(params.id));
    setState({...user})
  }, []);

  const editProfile = e => {
    e.preventDefault()

    const User = new FormData();
    Object.keys(state).forEach(item => { User.append(item, state[item]) })

    dispatch(editUser(User));
  };

  const removeUser = async () => {
    await dispatch(deleteUser(params.id))
  }

  const changeInputHandler = e => setState({...state, [e.target.name]: e.target.value})
  const changeFileHandler = e => setState({...state, [e.target.name]: e.target.files[0]})

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={10} lg={8}>
        <Box ml={4}>
          <Box pt={2} pb={2}>
            <Typography variant="h4">Edit User</Typography>
          </Box>
          {state && <Grid container direction="column" spacing={2}>
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
              <select name="role" value={state.role} onChange={changeInputHandler}>
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
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={editProfile}
                >
                  Сохронить изменения
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon/>}
                  onClick={handleClickOpen}
                >
                  Удалить пользователя
                </Button>
              </Grid>
            </Grid>
          </Grid>}
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
              >да</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default EditUser;