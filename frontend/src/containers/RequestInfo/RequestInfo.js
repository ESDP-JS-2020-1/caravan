import React, {useEffect, useState} from 'react';

import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";

import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import {
    closeRequest,
    deleteNominatedRequest,
    getRequest,
    nominatedRequest
} from "../../store/actions/requestsActions";


import {wordList} from "../../wordList";
import {checkPermission} from "../../CheckPermission";

const useStyles = makeStyles({
    flex: {
        display: 'flex',
    },
    padding: {
        padding: '10px 0'
    },
    margin: {
        margin: '10px 0'
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
    paper: {
        width: '70%',
        padding: '20px',
        margin: '0 auto',
        marginTop: '5%'
    },
    typographyCss: {
        marginRight: '10px'
    },
    boxPd: {
        padding: '10px'
    },
});

const RequestInfo = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const request = useSelector(state => state.requests.request);
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getRequest(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    const [showCouriers, setShowCouriers] = useState(false);

    const showCouriersHandler = () => setShowCouriers(!showCouriers);
    const courierList = () => {
        if (request.request.products.find(elem => elem.isRefrigeratorRequired === true) !== undefined) return request.courierList.filter(courier => courier.carRefrigerator === true);
        return request.courierList;
    };

    return (
        <Container>
            <Paper className={classes.paper} elevation={3}>
                <Box className={classes.typography} component={'span'}>
                    <Typography className={classes.typographyText} variant="h6" gutterBottom>
                        {wordList[language].requestInfo.requestInfoTitle}
                    </Typography>
                </Box>

                {request.request && <>
                    <Typography className={classes.padding} variant='h5'>
                        <b>{wordList[language].requestInfo.requestInfoUser} </b>{request.request.user.displayName}
                    </Typography>

                    <Typography className={classes.padding}
                                variant='h5'><b>{wordList[language].requestInfo.requestInfoPhone} </b>{request.request.user.phone}
                    </Typography>

                    <Typography className={classes.padding} variant='h5'><b>
                        {wordList[language].requestInfo.requestInfoDate}
                    </b> {moment(request.request.date).format('MMMM Do YYYY, h:mm:ss a')}
                    </Typography>

                    <Typography className={classes.padding}
                                variant='h5'><b>{wordList[language].requestInfo.requestInfoStatus} </b>{request.request.status}
                    </Typography>
                    <Divider/>
                    {request.request.user.market && <>
                        <Typography className={classes.padding}
                                    variant='h5'><b>{wordList[language].requestInfo.requestInfoMarket} </b>{request.request.user.market.companyName}
                        </Typography>

                        <Typography className={classes.padding}
                                    variant='h5'><b>{wordList[language].requestInfo.requestInfoAddress} </b>{request.request.user.market.address}
                        </Typography>

                        <Typography className={classes.padding}
                                    variant='h5'><b>{wordList[language].requestInfo.requestInfoCoord} </b>lat: {request.request.user.market.coordinates.lat} ,
                            lng: {request.request.user.market.coordinates.lng}</Typography>
                    </>}

                    <Divider/>

                    <Box className={classes.boxPd} border={1} borderRadius={6}>
                        <Typography
                            variant='h5'><b>{wordList[language].requestInfo.requestInfoProducts}: </b></Typography>
                        {request.request.products.map((elem, id) => (
                            <Card key={id}>
                                <CardContent>
                                    <Typography variant="h6" style={{marginRight: '10px'}}>
                                        <b>{wordList[language].requestInfo.requestInfoProductsTitle}:</b> {elem.product.name}
                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        <b>{wordList[language].requestInfo.requestInfoProductsQty}:</b> {elem.amount}
                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        <b>
                                            {wordList[language].requestInfo.requestInfoRefrigerator}:
                                        </b> {elem.product.isRefrigeratorRequired ?
                                        (wordList[language].requestInfo.refrigeratorNec)
                                        : (wordList[language].requestInfo.refrigeratorNotNec)}
                                    </Typography>
                                </CardContent>
                                <Divider style={{border: '1px solid black'}}/>
                            </Card>
                        ))}
                    </Box>
                </>}

                {request.nominatedCourier && <>

                    {checkPermission('closeRequest') && request.request.status === 'performed' && <>
                        <Button variant='contained' color='primary'
                                onClick={() => dispatch(closeRequest(request.request._id))}>
                            {wordList[language].requestInfo.closeBtn}
                        </Button>
                    </>}
                    <Typography variant='h5'><b>{wordList[language].requestInfo.requestInfoCourier} </b></Typography>
                    <Typography variant='h5'><b>
                        {wordList[language].requestInfo.requestInfoCourierDate}
                    </b> {moment(request.nominatedCourier.date).format('MMMM Do YYYY, h:mm:ss a')}
                    </Typography>
                    <Card>
                        <CardContent className={classes.flex}>
                            <Typography variant="h6" className={classes.typographyCss}>
                                <b>{wordList[language].requestInfo.courierName}: </b> {request.nominatedCourier.displayName}
                            </Typography>
                            <Typography variant="h6" className={classes.typographyCss}>
                                <b>{wordList[language].requestInfo.courierPhone}: </b> {request.nominatedCourier.phone}
                            </Typography>
                            <Typography variant="h6" component={NavLink} to={'/user/' + request.nominatedCourier._id}>
                                {wordList[language].requestInfo.courierInfo}
                            </Typography>
                            {user.role === 'operator' &&
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={() => dispatch(deleteNominatedRequest(request.request._id))}
                            >
                                {wordList[language].requestInfo.deleteCourierBtn}
                            </Button>}
                            {user.role === 'admin' && request.request.status !== 'closed' &&
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={() => dispatch(deleteNominatedRequest(request.request._id))}
                            >
                                {wordList[language].requestInfo.deleteCourierBtn}
                            </Button>}
                        </CardContent>
                    </Card>
                </>}

                {!request.isNominated &&
                <Button
                    className={classes.margin}
                    variant='contained'
                    color='primary'
                    onClick={showCouriersHandler}
                >
                    {wordList[language].requestInfo.nominateCourierBtn}
                </Button>}

                {showCouriers && !request.isNominated &&
                <Box style={{padding: '10px'}} border={1} borderRadius={6} borderColor='#cccccc'>
                    {request.courierList && courierList().map((elem, id) => (
                        <Card key={id}>
                            <CardContent className={classes.flex}>
                                <Typography variant="h6" style={{marginRight: '10px'}}>
                                    <b>{wordList[language].requestInfo.courierName}: </b> {elem.displayName}
                                </Typography>
                                <Typography variant="h6" style={{marginRight: '10px'}}>
                                    <b>{wordList[language].requestInfo.courierPhone}: </b> {elem.phone}
                                </Typography>
                                <Typography variant="h6" style={{marginRight: '10px'}}>
                                    <b>
                                        {wordList[language].requestInfo.requestInfoRefrigerator}:
                                    </b> {elem.courier.carRefrigerator ?
                                    (wordList[language].requestInfo.fridgeAvail)
                                    : (wordList[language].requestInfo.fridgeNotAvail)}
                                </Typography>
                                <Button
                                    onClick={() => dispatch(nominatedRequest(elem._id, request.request._id))}
                                    variant='contained'
                                >{wordList[language].requestInfo.nomBtn}</Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>}
            </Paper>
        </Container>
    );
};

export default RequestInfo;