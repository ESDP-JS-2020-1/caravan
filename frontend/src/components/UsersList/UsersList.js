import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {NavLink} from "react-router-dom";

export default function MaterialTableDemo(props) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    const users = useSelector(state => state.users.users)

    return (
        <Box mt={2}>
            <Grid container justify='flex-end'>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        component={NavLink}
                        to='/users/new'
                    >Добавить нового пользователя</Button>
                </Grid>
            </Grid>
            <Box mt={2}>
                <Grid container>
                    <Grid item xs>
                        <MaterialTable
                            title="Список пользователей"
                            columns={[
                                {title: 'Display Name', field: 'displayName'},
                                {title: 'Username', field: 'username'},
                                {title: 'Role', field: 'role'},
                            ]}
                            data={users ? users : []}
                            actions={[
                                {
                                    icon: 'edit',
                                    tooltip: 'save user',
                                    onClick: () => {
                                        props.history.push('/edit')
                                    }
                                }
                            ]}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

