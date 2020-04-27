import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddProductItem from "./AddProductItem/AddProductItem";
import {useDispatch, useSelector} from "react-redux";
import {addNewProduct, createProductInit} from "../../store/actions/productsActions";
import Alert from "@material-ui/lab/Alert";

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
    }
}));

const AddProduct = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const error = useSelector(state => state.products.error);

    const [product, setProduct] = useState([{
        name: '',
        amount: '',
        price: '',
        image: ''
    }]);
    const [expanded, setExpanded] = React.useState(false);

    const inputChangeHandler = (e, i) => {
        let newProduct = [...product];
        newProduct[i][e.target.name] = e.target.value;

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

        const newProduct = product[0] ? [...product, {
            name: '',
            amount: '',
            price: '',
            image: ''
        }] : [{
            name: '',
            amount: '',
            price: '',
            image: ''
        }];

        setProduct(newProduct)
    };

    const deleteProduct = id => {
        const products = [...product];
        products.splice(id, 1);

        setProduct(products);
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
            <Grid style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            Добовление продуктов
                        </Typography>
                    </Box>
                    <form onSubmit={onSubmit}>
                        <Grid container direction='column' spacing={1}>

                            {product.map((p, i) => (
                                <AddProductItem
                                    key={i}
                                    product={product}
                                    expanded={expanded}
                                    classes={classes}
                                    onChange={inputChangeHandler}
                                    handleChange={handleChange}
                                    fileChange={fileChangeHandler}
                                    onRemove={deleteProduct}
                                    index={i}
                                    p={p}
                                />
                            ))}

                            {error && <Grid item>
                                <Alert severity='error'>{error}</Alert>
                            </Grid>}
                            <Grid item>
                                <Box className={classes.formBtn} component="span">
                                    <Button
                                        onClick={addProduct}
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
                                    >
                                        Сохранить
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