import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsList} from "../../store/actions/productsActions";
import {getStatisticsProducts} from "../../store/actions/statisticsActions";
import moment from "moment";
import Spinner from "../../components/UI/Spinner/Spinner";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {wordList} from "../../wordList";
import Button from "@material-ui/core/Button";
import {Bar} from "react-chartjs-2";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {toast, ToastContainer} from "react-toastify";

const Statistics = () => {

    const createRandomColor = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        const opacityFactor = 0.7;

        return `rgba(${r},${g},${b},${opacityFactor})`
    };

    const [numberOfDays, setNumberOfDays] = useState('');
    const [findProduct, setFindProduct] = useState('');

    const dispatch = useDispatch();

    const statistics = useSelector(state => state.statistics.productStatistic);
    const language = useSelector(state => state.language.name);
    const products = useSelector(state => state.products.productsList);

    const defaultProps = {
        options: products,
        getOptionLabel: (option) => option.name,
    };

    const getStatistics = () => {
        if (findProduct === '' || numberOfDays === '') {
            toast.error(wordList[language].productList.errorMessage);
        } else {
            dispatch(getStatisticsProducts(findProduct._id, numberOfDays));
            setFindProduct('');
            setNumberOfDays('');
        }
    };

    const inputChangeHandler = e => setNumberOfDays(e.target.value);

    const autoCompleteChangeHandler = (e, value) => {
        setFindProduct(value);
    };

    useEffect(() => {
        dispatch(getProductsList());
    }, [dispatch]);

    const dateFormat = 'MMMM Do YYYY, h:mm:ss a';

    const amounts = statistics && statistics.statistic.map(elem => {
        return parseInt(elem.product.amount);
    });

    const dates = statistics && statistics.statistic.map(elem => moment(elem.date).format(dateFormat));
    const colors = statistics && statistics.statistic.map(() => createRandomColor());

    const data = {
        labels: dates,
        datasets: [{
            label: '# of Votes',
            data: amounts,
            backgroundColor: colors,
            borderWidth: 1
        }]
    };

    const loading = useSelector(state => state.loading.loading);
    if (loading) {
        return <Spinner/>
    }

    return (
        <Box mt={1}>
            <ToastContainer/>
            <Grid container direction='column' spacing={1}>
                <Grid container alignItems='center'>
                    <Grid item>
                        <Typography variant='h2'>
                            {wordList[language].statistic.statisticTitle}
                        </Typography>
                        {statistics && (
                            <Typography variant='h3'>
                                ({statistics.product.name})
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container alignItems='center' spacing={1}>
                            <Grid item xs>
                                <Box ml={2}>
                                    <Autocomplete
                                        {...defaultProps}
                                        id="debug"
                                        debug
                                        onChange={(e, value) => autoCompleteChangeHandler(e, value)}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                       label={wordList[language].productList.searchProduct}
                                                       variant="outlined"
                                                       margin="normal"/>}
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="number"
                                    name='numberOfDays'
                                    onChange={inputChangeHandler}
                                    label={wordList[language].productList.statLabel}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary'
                                        onClick={getStatistics}
                                >
                                    {wordList[language].search}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant='h6'>
                        {wordList[language].statistic.salesStatistics}
                    </Typography>
                </Grid>
                <Grid item>
                    <Bar
                        data={data}
                        width={100}
                        height={500}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics;