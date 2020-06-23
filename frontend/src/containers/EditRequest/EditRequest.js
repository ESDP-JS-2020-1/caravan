import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";

import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import {
    createRequestInit,
    deleteRequestEdit,
    fetchRequestEdit,
    fetchSuccess,
    putRequestEdit
} from "../../store/actions/requestsActions";
import EditRequestItems from "./EditRequestItems";
import Modal from "../../components/UI/Modal/Modal";
import {wordList} from "../../wordList";
import Spinner from "../../components/UI/Spinner/Spinner";
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
    gridItem: {
        margin: '0 auto',
        marginTop: '5%'
    },
    autocomplete: {
        width: '100%',
        marginBottom: '2%'
    }
}));

const EditRequest = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const error = useSelector(state => state.requests.error);
    const editRequest = useSelector(state => state.requests.oneRequest);
    const language = useSelector(state => state.language.name);
    const products = useSelector(state => state.products.productsList);

    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = useState(false);

    const inputChangeHandler = (e, i) => {
        let newRequest = [...editRequest.products];
        newRequest[i][e.target.name] = e.target.value;

        dispatch(fetchSuccess({...editRequest, products: newRequest}))
    };

    const changeHandlerComment = (e) => {
        let newRequest = {...editRequest};
        newRequest[e.target.name] = e.target.value;

        dispatch(fetchSuccess(newRequest))
    };
    const autoCompleteChangeHandler = (element, i) => {
        if (element) {
            let newRequest = {...editRequest};
            newRequest.products[i].product = element;

            dispatch(fetchSuccess(newRequest));
        }
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
   // console.log(editRequest)
    const addRequest = (e) => {
        e.preventDefault();

        const newRequest = {...editRequest};

        newRequest.products = editRequest.products[0] ? [...editRequest.products, {
            product: '',
            amount: ''
        }] : [{product: '', amount: ''}];

        console.log(newRequest);
        dispatch(fetchSuccess(newRequest))
    };
    const openAndClosed = () => (setOpen(!open));
    const removeRequest = id => {
        const requests = {...editRequest};
        requests.products.splice(id, 1);
        dispatch(fetchSuccess(requests));
    };

    const submitFormHandler = async e => {
        e.preventDefault();
        dispatch(putRequestEdit(props.match.params.id, editRequest));
    };

    useEffect(() => {
        dispatch(createRequestInit());
        dispatch(fetchRequestEdit(props.match.params.id));
        dispatch(getProductsList());

    }, [dispatch, props.match.params.id]);

    const loading = useSelector(state => state.loading.loading);
    if (loading) {
        return <Spinner/>
    }

    return (
        <Container>
            <Grid className={classes.gridItem} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            {wordList[language].editRequest.editRequestTitle}
                        </Typography>
                    </Box>
                    <form onSubmit={submitFormHandler}>
                        <Grid container direction='column' spacing={1}>

                            {editRequest.products && editRequest.products.map((r, i) => (
                                <EditRequestItems
                                    changeHandlerComment={changeHandlerComment}
                                    key={i}
                                    request={editRequest}
                                    expanded={expanded}
                                    classes={classes}
                                    onChange={inputChangeHandler}
                                    onAutoCompleteChange={autoCompleteChangeHandler}
                                    handleChange={handleChange}
                                    onRemove={removeRequest}
                                    index={i}
                                    r={r}
                                    products={products}
                                />
                            ))}
                            {error &&
                            <Alert severity="error">
                                {error === 'One of products in request has more products than is in stock!' ?
                                    'В одном из продуктов заявки вы выбрали больше товара чем имеется на скалде!' :
                                    error}
                            </Alert>
                            }
                            <Grid item>
                                <Box className={classes.formBtn} component="span">
                                    <Button
                                        onClick={addRequest}
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                    >
                                        {wordList[language].editRequest.addRequestBtn}
                                    </Button>
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        disabled={editRequest.products && !editRequest.products[0]}
                                        id={'Edit'}
                                    >
                                        {wordList[language].editRequest.editRequestBtn}
                                    </Button>
                                </Box>

                            </Grid>

                            <Grid item>
                                <Button
                                    className={classes.formButton}
                                    variant='contained'
                                    color='secondary'
                                    onClick={openAndClosed}
                                    id="remove"
                                >
                                    {wordList[language].editRequest.deleteRequestBtn}
                                </Button>
                            </Grid>
                            <Modal
                                title={wordList[language].editRequest.modalEditTitle}
                                open={open}
                                onClose={openAndClosed}
                            >
                                <Grid container justify="flex-end" spacing={1}>
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            onClick={() => dispatch(deleteRequestEdit(props.match.params.id, editRequest))}
                                            id="yes"
                                        >
                                            {wordList[language].editRequest.modalBtnPos}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={openAndClosed}
                                        >
                                            {wordList[language].editRequest.modalBtnNeg}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Modal>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Container>
    );
};

export default EditRequest;