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
import {fade, makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
    }
}));

const ProductList = () => {
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
                isRefrigeratorRequired={elem.isRefrigeratorRequired}
                id={elem._id}
            />
        )
    });

    return (
        <>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item>
                            <Typography variant='h3' paragraph>
                                Cписок продуктов
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant='contained'
                                color='primary' startIcon={<AddIcon/>}
                                component={NavLink}
                                to='product/add'
                            >
                                Добавить новые продукты
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.paddingLeft}><b>Фото</b></TableCell>
                                    <TableCell className={classes.offPadding}><b>Название</b></TableCell>
                                    <TableCell className={classes.offPadding}><b>Количество</b></TableCell>
                                    <TableCell className={classes.offPadding}><b>Цена</b></TableCell>
                                    <TableCell className={classes.offPadding}><b>Наличие холодильника для перевозки</b></TableCell>
                                    <TableCell className={classes.offPadding}>
                                        <div className={classes.search}>
                                            <div className={classes.searchIcon}>
                                                <SearchIcon />
                                            </div>
                                            <InputBase
                                                placeholder="Найти продукт…"
                                                value={search.search}
                                                onChange={changeSearch}
                                                classes={{
                                                    root: classes.inputRoot,
                                                    input: classes.inputInput,
                                                }}
                                                inputProps={{ 'aria-label': 'search' }}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productsList}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductList;