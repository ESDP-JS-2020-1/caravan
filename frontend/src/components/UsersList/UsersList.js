import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../store/actions/usersActions";

export default function MaterialTableDemo(props) {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    const users = useSelector(state => state.users.users)

    return (
        <MaterialTable
            style={{marginTop: '5%'}}
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
    );
}

