import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import TableCell from "@material-ui/core/TableCell";
import {fade, makeStyles} from "@material-ui/core/styles";

import {getProductsList} from "../../store/actions/productsActions";
import ProductListItem from "./ProductListItem/ProductListItem";
import FormElement from "../../components/UI/Form/FormElement";
import {wordList} from "../../wordList";
import {checkPermission} from "../../CheckPermission";
import ProductCard from "../../components/ProductCard/ProductCard";
import Box from "@material-ui/core/Box";
import {Hidden} from "@material-ui/core";
import Spinner from "../../components/UI/Spinner/Spinner";


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '900px',
    },
    offPadding: {
        padding: '10px 0'
    },
    paddingLeft: {padding: '10px 0px 10px 20px'},
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        }
    },
    table: {
        overflow: 'visible'
    }
}));

const ProductList = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const products = useSelector(state => state.products.productsList);
    const user = useSelector(state => state.users.user);
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getProductsList());

    }, [dispatch]);

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('product');

    const [search, setSearch] = useState({search: myParam ? myParam : ''});


    const changeSearch = e => {
        if (e.target.value[e.target.value.length - 1] === '\\') return setSearch({search: ''});
        setSearch({search: e.target.value});
    };

    const productList = products.filter(word => word.name.search(new RegExp( search.search , 'i')) !== -1);
    const card = productList.map((elem, i) => {
        return (
            <ProductCard
                userInfo={user}
                key={elem._id}
                title={elem.name}
                amount={elem.amount}
                productType={elem.productType}
                price={elem.price}
                image={elem.image}
                isRefrigeratorRequired={elem.isRefrigeratorRequired}
                id={elem._id}
                index={i}
            />
        )
    });

    const productsList = productList.map((elem) => {
        return (
            <ProductListItem
                userInfo={user}
                key={elem._id}
                title={elem.name}
                amount={elem.amount}
                productType={elem.productType}
                price={elem.price}
                image={elem.image}
                isRefrigeratorRequired={elem.isRefrigeratorRequired}
                id={elem._id}
            />

        )
    });

    const loading = useSelector(state => state.loading.loading)
    if (loading) {
        return <Spinner/>
    }

    return (
        <>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item>
                            <Typography variant='h3' paragraph>
                                {wordList[language].productList.productListTitle}
                            </Typography>
                        </Grid>
                        {checkPermission('addProduct') &&
                        <Grid item>
                            <Button
                                variant='contained'
                                color='primary' startIcon={<AddIcon/>}
                                component={NavLink}
                                to='product/add'
                            >
                                {wordList[language].productList.addNewProduct}
                            </Button>
                        </Grid>
                        }
                    </Grid>
                    <Hidden mdUp>
                        <Grid item>
                        <Box m={1}> <FormElement
                            type='search'
                            propertyName='search'
                            title={wordList[language].productList.searchProduct}
                            value={search.search}
                            onChange={changeSearch}
                        /></Box>
                    </Grid>
                    </Hidden>
                </Grid>
                <Hidden smDown> <Grid item>
                    <Paper className={classes.root}>
                        <TableContainer component={Paper} className={classes.table}>
                            <Table aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            className={classes.paddingLeft}><b>{wordList[language].productList.photo}</b></TableCell>
                                        <TableCell
                                            className={classes.offPadding}><b>{wordList[language].productList.name}</b></TableCell>
                                        <TableCell
                                            className={classes.offPadding}><b>{wordList[language].productList.quantity}</b></TableCell>
                                        <TableCell
                                            className={classes.offPadding}><b>{wordList[language].productList.productType}</b></TableCell>
                                        <TableCell
                                            className={classes.offPadding}><b>{wordList[language].productList.price}</b></TableCell>
                                        <TableCell
                                            className={classes.offPadding}><b>{wordList[language].productList.isRefrigeratorRequired}</b></TableCell>
                                        <TableCell className={classes.offPadding}>
                                            <FormElement
                                                type='search'
                                                propertyName='search'
                                                title={wordList[language].productList.searchProduct}
                                                onChange={changeSearch}
                                                value={search.search}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Hidden xlUp>
                                     {productsList}
                                    </Hidden>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                </Hidden>
                <Hidden mdUp>
                    <Grid container>
                        {card}
                    </Grid>
                </Hidden>
            </Grid>
        </>
    );
};

export default ProductList;