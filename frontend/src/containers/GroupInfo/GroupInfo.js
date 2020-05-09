import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addUserToGroup, getGroup} from "../../store/actions/groupActions";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {getUsers} from "../../store/actions/usersActions";

const useStyles = makeStyles({
    typography: {
        color: '#0d47a1',
        textAlign: 'center',
    },
    typographyText: {
        borderBottom: '2px solid #0d47a1',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: '3%',
    },
    paper: {
        width: '70%',
        padding: '20px',
        margin: '0 auto',
        marginTop: '5%'
    },
});

const GroupInfo = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const group = useSelector(state => state.groups.group);

    const users = useSelector(state => state.users.users);
    const usersList = users && [...users];
    group.list && group.list.forEach((groupUser) => {
        users && usersList.forEach((user, id) => {
           if(groupUser.user._id === user._id) {
               usersList.splice(id, 1)
           }
       })
    });

    useEffect(() => {
        dispatch(getGroup(props.match.params.id));
        dispatch(getUsers());
    }, [dispatch, props.match.params.id]);
    return (
        <Paper className={classes.paper} elevation={3}>
            <Box className={classes.typography} component={'span'}>
                <Typography className={classes.typographyText} variant="h6" gutterBottom>
                    Информация о группе
                </Typography>
            </Box>
            {group.list && <>
                <Typography variant='h5' style={{padding: '15px 0'}}>
                    <b>Название группы </b>{group.name}</Typography>
                <Divider/>

                {group.list.length > 0 &&
                <Box style={{padding: '15px'}}  border={1} borderRadius={6}>
                    <Typography variant='h5'><b>Участники: </b></Typography>
                    {group.list.map((elem, id) => (
                        <Card key={id}>
                            <CardContent>
                                <Typography variant="h6" style={{marginRight: '10px'}}>
                                    <b>Имя:</b> {elem.user.displayName}
                                </Typography>
                                <Button variant='contained' component={NavLink} to={`/user/${elem.user._id}`}>Информания о пользователе</Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>}

                {usersList && usersList[0] &&
                <Box style={{padding: '15px', marginTop: '20px'}}  border={1} borderRadius={6}>
                    <Typography variant='h5'><b>Пользователи которых можно добавить: </b></Typography>
                    {usersList.map((elem, id) => (
                        <Card key={id}>
                            <CardContent style={{display: 'flex'}}>
                                <Typography variant="h6" style={{marginRight: '10px'}}>
                                    <b>Имя:</b> {elem.displayName}
                                </Typography>
                                <Button style={{marginLeft: 'auto'}} variant='contained' component={NavLink} to={`/user/${elem._id}`}>Информания</Button>
                                <Button style={{marginLeft: '5px'}} onClick={() => dispatch(addUserToGroup(props.match.params.id, elem._id))} variant='contained' color='primary'>Добавить в группу</Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>}
            </>}
        </Paper>
    );
};

export default GroupInfo;