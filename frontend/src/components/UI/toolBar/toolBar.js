import React from 'react';
import {useSelector} from "react-redux";
import AuthUserToolBar from "./authUserToolBar";
import NoAuthUserToolBar from "./noAuthToolBar";

const ToolBar = () => {
    const user = useSelector(state => state.users.user);

    return (
        <>
            {user && <AuthUserToolBar/>}
            {!user && <NoAuthUserToolBar/>}
        </>
    );
};

export default ToolBar;