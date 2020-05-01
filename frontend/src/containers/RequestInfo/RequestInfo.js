import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRequest} from "../../store/actions/requestsActions";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import WithAuthorization from "../../components/HOC/WithAuthorization/WithAuthorization";

const useStyles = makeStyles({
    flex: {
        display: 'flex'
    }
});

const RequestInfo = WithAuthorization(props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const request = useSelector(state => state.requests.request);

    useEffect(() => {
        dispatch(getRequest(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    return (
        <div>
            <Typography variant='h5'><b>Автор: </b>{request.user && request.user.displayName}</Typography>
            <Typography variant='h5'><b>Дата создания: </b>{moment(request.date).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
            <Typography variant='h5'><b>Продукты: </b></Typography>
            {request.products && request.products.map((elem, id) => (
                <Paper elevation={3} key={id}>
                    <Card className={classes.root}>
                        <CardContent className={classes.flex}>
                            <Typography variant="h6" style={{marginRight: '10px'}}>
                                Название: {elem.title}
                            </Typography>
                            <Typography variant="h6" component="h2">
                                Количество: {elem.amount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>
            ))}
        </div>
    );
});

export default RequestInfo;