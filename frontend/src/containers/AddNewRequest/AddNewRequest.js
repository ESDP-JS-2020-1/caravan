import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {createRequest, createRequestInit} from "../../store/actions/requestsActions";
import AddNewRequestItem from "./AddNewRequestItem/AddNewRequestItem";
import {NavLink} from "react-router-dom";
import FormElement from "../../components/UI/Form/FormElement";
import WithAuthorization from "../../components/HOC/WithAuthorization/WithAuthorization";

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
    }
}));

const AddNewRequest = WithAuthorization(() => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [request, setRequest] = useState({
        products: [{
            title: '',
            amount: '',
        }],
        comment: ''
    });

    const [expanded, setExpanded] = React.useState(false);

    const inputChangeHandler = (e, i) => {
        let newRequest = {...request};
        newRequest.products[i][e.target.name] = e.target.value;

        setRequest(newRequest);

    };

    const autoCompleteChangeHandler = (e, i) => {
        let newRequest = {...request};
        newRequest.products[i].title = e.target.innerHTML;

        setRequest(newRequest);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const commentChange = e => setRequest({...request, comment: e.target.value});

    const addRequest = (e) => {
        e.preventDefault();

        const newRequest = {...request};

        newRequest.products = request.products[0] ? [...request.products, {title: '', amount: ''}] : [{title: '', amount: ''}];

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
        dispatch(createRequestInit())
    }, [dispatch]);

    return (
        <Container>
            <Grid style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" p={5} style={{textAlign: 'center'}}>
                    <Button
                        className={classes.linkBtn}
                        variant="contained"
                        component={NavLink}
                        to='/products'
                    >
                        Доступный товар
                    </Button>
                </Box>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            Создать заявку
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

                            <FormElement
                                id='comment'
                                propertyName='comment'
                                title='Комментарий'
                                value={request.comment}
                                onChange={commentChange}
                            />

                            <Grid item>
                                <Box className={classes.formBtn} component="span">
                                    <Button
                                        onClick={addRequest}
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                    >
                                        Добавить
                                    </Button>
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        disabled={!request.products[0]}
                                    >
                                        Создать заявку
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Container>
    );
});

export default AddNewRequest;