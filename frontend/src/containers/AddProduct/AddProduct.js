import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import {addNewProduct, createProductInit} from "../../store/actions/productsActions";
import AddProductItem from "./AddProductItem/AddProductItem";
import {wordList} from "../../wordList";

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
    phoneInput: {
        width: '100%',
    },
    gridItem: {
        margin: '0 auto',
        marginTop: '5%'
    },
    mainBox: {
        width: '100%',
        marginBottom: "10px"
    },
}));

const AddProduct = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.products.error);
    let errorMessage;
    if (error) {
        errorMessage = `Продукт с названием ${error.op.name} уже существует!`
    }
    const [product, setProduct] = useState([{
        name: '',
        amount: '',
        productType: '',
        price: '',
        image: '',
        isRefrigeratorRequired: false
    }]);
    const [expanded, setExpanded] = React.useState(false);

    const language = useSelector(state => state.language.name);

    const inputChangeHandler = (e, i) => {
        let newProduct = [...product];
        newProduct[i][e.target.name] = e.target.value;

        setProduct(newProduct)
    };

    const autoCompleteChangeHandler = (e, i, value) => {
        let newProduct = [...product];
        newProduct[i].productType = value;

        setProduct(newProduct);
    };

    const checkboxChangeHandler = (e, i) => {
        let newProduct = [...product];
        newProduct[i].isRefrigeratorRequired = !newProduct[i].isRefrigeratorRequired;

        setProduct(newProduct)
    };

    const fileChangeHandler = (e, i) => {
        let newProduct = [...product];
        newProduct[i][e.target.name] = e.target.files[0];
        setProduct(newProduct)
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const addProduct = (e) => {
        e.preventDefault();
        const productInfo = {
            name: '',
            amount: '',
            productType: '',
            price: '',
            image: '',
            isRefrigeratorRequired: false
        };
        const newProduct = product[0] ? [...product, productInfo] : [productInfo];
        setProduct(newProduct)
    };

    const deleteProduct = id => {
        const products = [...product];
        products.splice(id, 1);
        setProduct(products);
        if (products.length < 1) dispatch(createProductInit());
    };

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(addNewProduct(product))
    };

    useEffect(() => {
        dispatch(createProductInit())
    }, [dispatch]);

    return (
        <Container>
            <Grid className={classes.gridItem} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            {wordList[language].addProduct.addProductTitle}
                        </Typography>
                    </Box>
                    <form onSubmit={onSubmit}>
                        <Grid container direction='column' spacing={1}>
                            {product.length !== 0 ?
                                product.map((p, i) => (
                                    <AddProductItem
                                        key={i}
                                        product={product}
                                        expanded={expanded}
                                        classes={classes}
                                        onChange={inputChangeHandler}
                                        autoChange={autoCompleteChangeHandler}
                                        checkboxChangeHandler={checkboxChangeHandler}
                                        handleChange={handleChange}
                                        fileChange={fileChangeHandler}
                                        onRemove={deleteProduct}
                                        index={i}
                                        p={p}
                                    />
                                )) :
                                <Box my={2}>
                                    <Typography variant='h5'>
                                        {'Нет добавленных продуктов'}
                                    </Typography>
                                </Box>}

                            {error && <Grid item>
                                <Alert severity='error'>{errorMessage}</Alert>
                            </Grid>}
                            <Grid item>
                                <Box className={classes.formBtn} component="span">
                                    <Button
                                        onClick={addProduct}
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                    >
                                        {wordList[language].addProduct.addProductBtn}
                                    </Button>
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        disabled={!product[0]}
                                    >
                                        {wordList[language].addProduct.createProductBtn}
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

export default AddProduct;