import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import AuthUserToolBar from "./authUserToolBar";
import NoAuthUserToolBar from "./noAuthToolBar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {setLanguage} from "../../../store/actions/languageActions";
import {NavLink} from "react-router-dom";
import {wordList} from "../../../wordList";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
    button: {
        color: 'white',
        fontWeight: 'bold'
    }
});

const ToolBar = () => {

    const classes = useStyles();

    const user = useSelector(state => state.users.user);
    const language = useSelector(state => state.language.name);

    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const switchLanguage = name => {
        dispatch(setLanguage(name))
        handleClose()
    }

    return (
        <>

            <Hidden smDown>
                {user && user.role === 'admin' && (
                    <>
                        <Button
                            color='primary'
                            component={NavLink}
                            to='/history'
                            exact
                            activeClassName='Mui-disabled'
                            className={classes.button}
                        >
                            {wordList[language].navigation.historyList}
                        </Button>
                        <Button
                            color='primary'
                            component={NavLink}
                            to='/groups'
                            exact
                            activeClassName='Mui-disabled'
                            className={classes.button}
                        >
                            {wordList[language].navigation.groupList}
                        </Button>
                        <Button
                            color='primary'
                            component={NavLink}
                            to='/users'
                            exact
                            activeClassName='Mui-disabled'
                            className={classes.button}
                        >
                            {wordList[language].navigation.userList}
                        </Button>
                        <Button
                            color='primary'
                            component={NavLink}
                            to='/requests'
                            exact
                            activeClassName='Mui-disabled'
                            className={classes.button}
                        >
                            {wordList[language].navigation.requestList}
                        </Button>
                    </>
                )}
            </Hidden>

            {user && <Button
                color='primary'
                className={classes.button}
                component={NavLink}
                to='/requests/new'
                exact
                activeClassName='Mui-disabled'
            >
                {wordList[language].authUserToolBar.requestBtn}
            </Button>}

            <Button
                startIcon={<TranslateIcon/>}
                endIcon={<ExpandMoreIcon/>}
                color='primary'
                aria-controls="language-switcher"
                aria-haspopup="true"
                onClick={handleClick}
                className={classes.button}
            >
                {language}
            </Button>
            <Menu
                id="language-switcher"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => switchLanguage('ru')}>Русский</MenuItem>
                <MenuItem onClick={() => switchLanguage('kg')}>Кыргызча</MenuItem>
            </Menu>
            {user && <AuthUserToolBar/>}
            {!user && <NoAuthUserToolBar/>}
        </>
    );
};

export default ToolBar;