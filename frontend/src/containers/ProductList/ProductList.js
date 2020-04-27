import React, {useEffect} from 'react';
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

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.productsList);

    useEffect(() => {
        dispatch(getProductsList());
    }, [dispatch]);

    const productsList = products.map((elem) => {
        return (
            <ProductListItem
                key={elem._id}
                title={elem.name}
                amount={elem.amount}
                price={elem.price}
                image={elem.image}
            />
        )
    });

    return (
        <>
            <Typography variant='h3'>
                Cписок продуктов
            </Typography>
            <Grid container>
                <TableContainer component={Paper}>
                    <Table aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Фото</b></TableCell>
                                <TableCell><b>Название</b></TableCell>
                                <TableCell><b>Количество</b></TableCell>
                                <TableCell><b>Цена</b></TableCell>
                                <TableCell> </TableCell>
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
};

export default ProductList;