import React, {useEffect} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../store/actions/usersActions";
import List from "@material-ui/core/List";
import UserItem from "./UserListItem/UserListItem";

const UsersList = () => {
    const dispatch = useDispatch()

    const users = useSelector(state => state.users.users)

    console.log(users);

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return  (
        <Box mt={2}>
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        component={NavLink}
                        to='/users/new'
                    >
                        Добавить пользователя
                    </Button>
                </Grid>
            </Grid>
            <List>
                {users && users.map((user, index) => {
                    return (
                        <UserItem
                            displayName={user.displayName}
                            number={index+1}
                            role={user.role}
                        />
                    )
                })}
            </List>
        </Box>
    );
};

export default UsersList;