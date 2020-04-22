import React from 'react';
import {NavLink} from 'react-router-dom'
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import ToolBar from "../UI/toolBar/toolBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainLink: {
        color: 'inherit',
        flexGrow: 1,
        textDecoration: 'none',
        '&hover': {
            color: 'inherit'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
    }
}));


const Navigation = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color='primary'>
                <Container>
                    <Toolbar>
                        <Typography variant="h6" className={classes.mainLink} component={NavLink} to='/' exact>
                            Caravan
                        </Typography>
                        <ToolBar/>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Navigation;