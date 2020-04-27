import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsList} from "../../store/actions/productsActions";
import ProductListItem from "./ProductListItem/ProductListItem";
import Grid from "@material-ui/core/Grid";

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.productsList);

    useEffect(() => {
        dispatch(getProductsList());
    }, [dispatch]);

    const productsList = products.map((elem, id) => (
       <Grid item xs={3} key={id} style={{padding: '5px'}}>
           <ProductListItem
               id={elem._id}
               title={elem.name}
               amount={elem.amount}
               price={elem.price}
           />
       </Grid>
    ));

    return (
        <Grid container>
            {productsList}
        </Grid>
    );
};

export default ProductList;