import React from 'react';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {wordList} from "../../../wordList";

const NoAuthUserToolBar = () => {
    const language = useSelector(state => state.language.name);
    return (
        <>
            <Button color='inherit' component={NavLink} to='/login' exact>
                {wordList[language].loginBtn}
            </Button>
        </>
    );
};

export default NoAuthUserToolBar;