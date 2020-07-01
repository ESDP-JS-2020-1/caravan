import React, {useEffect, useState} from 'react';

import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import {createRequest, createRequestInit} from "../../store/actions/requestsActions";
import AddNewRequestItem from "./AddNewRequestItem/AddNewRequestItem";
import {wordList} from "../../wordList";
import Alert from "@material-ui/lab/Alert";
import {getProductsList} from "../../store/actions/productsActions";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    formBtn: {
        marginTop: '1%',
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    formButton: {
        fontWeight: 'bold',
        width: '49%',
        minHeight: '50px'
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
    linkBtn: {
        color: '#0d47a1',
        background: 'transparent'
    },
    mainBox: {
        width: '100%',
        marginBottom: "10px"
    },
    autocomplete: {
        width: '100%',
        marginBottom: '2%'
    },
    gridItem: {
        margin: '0 auto',
        marginTop: '5%'
    },
    boxTextCentre: {
        textAlign: 'center'
    }
}));

const AddNewRequest = () => {
    const classes = useStyles();
    const products = useSelector(state => state.products.productsList);

    const dispatch = useDispatch();
    const language = useSelector(state => state.language.name);
    const error = useSelector(state => state.requests.error);

    const [request, setRequest] = useState({
        products: [{
            product: '',
            amount: '',
            productInfo: ''
        }]
    });

    const [expanded, setExpanded] = React.useState(false);

    const inputChangeHandler = (e, i) => {
        let newRequest = {...request};
        newRequest.products[i][e.target.name] = e.target.value;
        setRequest(newRequest);
    };

    const autoCompleteChangeHandler = (value, i) => {
        let newRequest = {...request};
        newRequest.products[i].product = value._id;
        newRequest.products[i].productInfo = value;
        setRequest(newRequest);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const addRequest = (e) => {
        e.preventDefault();
        const newRequest = {...request};
        newRequest.products = request.products[0] ? [...request.products, {
            product: '',
            amount: '',
            productInfo: ''
        }] : [{product: '', amount: '', productInfo: ''}];
        setRequest(newRequest)
    };

    const removeRequest = id => {
        const requests = {...request};
        requests.products.splice(id, 1);
        setRequest(requests);
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        dispatch(createRequest(request));
    };

    useEffect(() => {
        dispatch(getProductsList());
        dispatch(createRequestInit())
    }, [dispatch]);

    const totalPriceArray = [0];
    request.products.forEach(product => {
        if (product.productInfo.price ) {
            const totalPrice = product.productInfo.price * Math.abs(product.amount) ;
            totalPriceArray.push(totalPrice)
        }
    });
    const sum = totalPriceArray.reduce((total, amount) => total + amount);

    return (
        <Container>
            <Grid className={classes.gridItem} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" p={5} className={classes.boxTextCentre}>
                    <Button
                        className={classes.linkBtn}
                        variant="contained"
                        component={NavLink}
                        to='/products'
                    >
                        {wordList[language].addNewRequest.productsBtn}
                    </Button>
                </Box>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            {wordList[language].addNewRequest.createRequestTitle}
                        </Typography>
                    </Box>
                    <form onSubmit={submitFormHandler}>
                        <Grid container direction='column' spacing={1}>

                            {request.products.map((r, i) => (
                                <AddNewRequestItem
                                    key={i}
                                    request={request.products}
                                    expanded={expanded}
                                    classes={classes}
                                    onChange={inputChangeHandler}
                                    onAutoCompleteChange={autoCompleteChangeHandler}
                                    handleChange={handleChange}
                                    onRemove={removeRequest}
                                    index={i}
                                    r={r}
                                />
                            ))}

                            {error &&
                            <Alert severity="error">
                                {error && error}
                            </Alert>
                            }
                            <Grid item>
                                <Grid item>
                                    <Typography>{wordList[language].addNewRequest.totalPrice}
                                        {sum
                                        } Сом</Typography>
                                </Grid>
                                <Box className={classes.formBtn} component="span">
                                    <Button
                                        onClick={addRequest}
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        disabled={products.length === request.products.length}
                                    >
                                        {wordList[language].addNewRequest.addRequestBtn}
                                    </Button>
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        disabled={!request.products[0]}
                                    >
                                        {wordList[language].addNewRequest.createRequestBtn}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Container>
    );
};

export default AddNewRequest;