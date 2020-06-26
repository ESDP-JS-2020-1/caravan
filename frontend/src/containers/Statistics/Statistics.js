import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProductsList} from "../../store/actions/productsActions";
import {getStatistics, statisticInit} from "../../store/actions/statisticsActions";
import moment from "moment";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {wordList} from "../../wordList";
import Button from "@material-ui/core/Button";
import {Bar} from "react-chartjs-2";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {toast, ToastContainer} from "react-toastify";
import {getUsers} from "../../store/actions/usersActions";

const Statistics = () => {

    const createRandomColor = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        const opacityFactor = 0.7;

        return `rgba(${r},${g},${b},${opacityFactor})`
    };

    const [range, setRange] = useState({
        from: moment(new Date()).format('YYYY-MM-DD'),
        to: moment(new Date()).format('YYYY-MM-DD')
    });
    const [type, setType] = useState({name: 'Продукты', type: 'product'});
    const [value, setValue] = useState(null);


    const dispatch = useDispatch();

    const statistics = useSelector(state => state.statistics.statistic);
    const language = useSelector(state => state.language.name);
    const products = useSelector(state => state.products.productsList);
    const users = useSelector(state => state.users.users);

    const fetchStatistics = () => {
        if (!value || !range.to || range.form) {
            toast.error(wordList[language].productList.errorMessage);
        } else {
            dispatch(getStatistics(value._id, range, type.type));
        }
    };

    const inputChangeHandler = e => setRange({...range, [e.target.name]: e.target.value});
    const valueChangeHandler = (e, value) => setValue(value);
    const typeChangeHandler = (e, value) => {
        setType(value);
        setValue(null)
    };

    const addOptions = () => {
        if (type.type === 'user') return users;
        if (type.type === 'product') return products
    };

    const addLabel = (label) => {
        if (type.type === 'user') return label.displayName;
        if (type.type === 'product') return label.name
    };

    const getData = useCallback(type => {
        if (type === 'user') dispatch(getUsers());
        if (type === 'product') dispatch(getProductsList());
    }, [dispatch]);


    useEffect(() => {
        getData(type.type);
        dispatch(statisticInit())
    }, [type, dispatch, getData]);

    const data = {
        labels: statistics && statistics.map(elem => moment(elem.date).format('MMMM Do YYYY, h:mm:ss a')),
        datasets: [{
            label: '# of Votes',
            data: statistics && statistics.map(elem => parseInt(elem.amount)),
            backgroundColor: statistics && statistics.map(() => createRandomColor()),
            borderWidth: 1
        }]
    };

    return (
        <Box mt={1}>
            <ToastContainer/>
            <Grid container direction='column' spacing={1}>
                <Grid container alignItems='center'>
                    <Grid item>
                        <Typography variant='h2'>
                            {wordList[language].statistic.statisticTitle}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container direction='column' spacing={1} xs>
                    <Grid item xs>
                        <Box ml={2}>
                            <Autocomplete
                                options={[
                                    {name: (wordList[language].statistic.optionName1), type: 'product'},
                                    {name: (wordList[language].statistic.optionName2), type: 'user'}
                                ]}
                                getOptionLabel={(option) => option.name}
                                value={type}
                                id="debug"
                                debug
                                onChange={(e, value) => typeChangeHandler(e, value)}
                                renderInput={(params) =>
                                    <TextField {...params}
                                               label={wordList[language].statistic.labelType}
                                               variant="outlined"
                                               margin="normal"
                                    />}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Box ml={2}>
                            <Autocomplete
                                options={addOptions()}
                                getOptionLabel={addLabel}
                                id="debug"
                                debug
                                value={value}
                                onChange={(e, value) => valueChangeHandler(e, value)}
                                renderInput={(params) =>
                                    <TextField {...params}
                                               label={wordList[language].statistic.labelDoc}
                                               variant="outlined"
                                               margin="normal"
                                    />}
                            />
                        </Box>
                    </Grid>
                    <Grid item container spacing={2}>
                        <Grid item>
                            <TextField
                                id="from" label={wordList[language].statistic.labelFrom}
                                name='from' type="date"
                                onChange={inputChangeHandler}
                                value={range.from} variant='outlined'
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="to" label={wordList[language].statistic.labelTo}
                                name='to' type="date"
                                onChange={inputChangeHandler}
                                value={range.to} variant='outlined'
                                InputLabelProps={{shrink: true}}
                            />
                        </Grid>

                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='primary'
                                onClick={fetchStatistics}>
                            {wordList[language].search}
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant='h6'>
                        {wordList[language].statistic.salesStatistics}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Bar
                        data={data} width={10}
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
    )
        ;
};

export default Statistics;