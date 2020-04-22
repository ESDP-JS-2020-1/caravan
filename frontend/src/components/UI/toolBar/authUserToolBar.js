import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logoutUserGet} from "../../../store/actions/usersActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import {NavLink} from "react-router-dom";

const AuthUserToolBar = () => {


    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    const logout = async () => {
        await dispatch(logoutUserGet());
    };

    return (
        <>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <ListItem disabled>Привет, {user.displayName}!</ListItem>
                <Divider/>
                <Divider/>
                <MenuItem component={NavLink} to={`/users/${user._id}`} exact>Профиль</MenuItem>
                <MenuItem onClick={logout}>Выйти</MenuItem>
            </Menu>
        </>
    );
};

export default AuthUserToolBar;