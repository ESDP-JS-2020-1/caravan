import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsList} from "../../store/actions/productsActions";
import ProductListItem from "./ProductListItem/ProductListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";
import WithAuthorization from "../../components/HOC/WithAuthorization/WithAuthorization";
import FormElement from "../../components/UI/Form/FormElement";

const useStyles = makeStyles(() => ({
    offPadding: {
        padding: '10px 0'
    },
    paddingLeft: {padding: '10px 0px 10px 20px'}
}));

const ProductList = WithAuthorization(() => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.productsList);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(getProductsList());
    }, [dispatch]);

    const [search, setSearch] = useState({search: ''});

    const changeSearch = e => {
        if(e.target.value[e.target.value.length - 1] === '\\') return setSearch({search: ''});
        setSearch({search: e.target.value});
    };

    const productList = products.filter(word => word.name.search(search.search) !== -1);

    const productsList = productList.map((elem) => {
        return (
            <ProductListItem
                userInfo={user}
                key={elem._id}
                title={elem.name}
                amount={elem.amount}
                price={elem.price}
                image={elem.image}
                id={elem._id}
            />
        )
    });

    return (
        <>
            <Typography variant='h3'>
                Cписок продуктов
            </Typography>
            <FormElement
                propertyName="search"
                title="Поиск продуктов"
                value={search.search}
                onChange={changeSearch}
                type="text"
            />
            <Grid container>
                <TableContainer component={Paper}>
                    <Table aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.paddingLeft}><b>Фото</b></TableCell>
                                <TableCell className={classes.offPadding}><b>Название</b></TableCell>
                                <TableCell className={classes.offPadding}><b>Количество</b></TableCell>
                                <TableCell className={classes.offPadding}><b>Цена</b></TableCell>
                                <TableCell className={classes.offPadding}> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsList}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
});

export default ProductList;