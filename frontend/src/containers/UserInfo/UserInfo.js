import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {getUser} from "../../store/actions/usersActions";

const useStyles = makeStyles({
    flex: {
        display: 'flex',
    },
    padding: {
        padding: '10px 0'
    },
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
});

const UserInfo = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.users.client);

    useEffect(() => {
        dispatch(getUser(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    return (
        <Container>
            <Paper style={{width: '70%', padding: '20px', margin: '0 auto', marginTop: '5%'}} elevation={3}>
                <Box className={classes.typography} component={'span'}>
                    <Typography className={classes.typographyText} variant="h6" gutterBottom>
                        Информация о пользователе
                    </Typography>
                </Box>
                {console.log(userInfo)}
                    {userInfo && <>
                        <Typography className={classes.padding} variant='h5'> <b>Пользователь </b>{userInfo.displayName}</Typography>

                        <Typography className={classes.padding} variant='h5'><b>Телефон </b>{userInfo.phone}</Typography>
                        <Divider/>

                        {userInfo.role === 'market' && <>
                            <Typography className={classes.padding} variant='h5'><b>Магазин </b>{userInfo.companyName}</Typography>

                            <Typography className={classes.padding} variant='h5'><b>Адрес </b>{userInfo.address}</Typography>
                            <Divider/>
                            </>}

                        {userInfo.role === 'courier' && <>
                            <Typography className={classes.padding} variant='h5'><b>Машина </b>{userInfo.carName}</Typography>

                            <Typography className={classes.padding} variant='h5'><b>Объем машины </b>{userInfo.carVolume}</Typography>

                            <Typography className={classes.padding} variant='h5'><b>Наличие холодильника </b>{userInfo.carRefrigerator ? 'Есть' : 'Отсутствует'}</Typography>
                            <Divider/>
                        </>}
                    </>}
            </Paper>
        </Container>
    );
};

export default UserInfo;