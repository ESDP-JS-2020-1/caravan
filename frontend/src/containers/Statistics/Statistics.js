import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom'

import {Bar} from 'react-chartjs-2';
import moment from "moment";

import {getStatistics} from "../../store/actions/statisticsActions";
import {getProductsList} from "../../store/actions/productsActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {wordList} from "../../wordList";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";


const useStyle = makeStyles({
    search: {
        marginLeft: 'auto'
    }
})


const Statistics = () => {

    const classes = useStyle()

    const createRandomColor = () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        const opacityFactor = 0.7

        return `rgba(${r},${g},${b},${opacityFactor})`
    }

    const [numberOfDays, setNumberOfDays] = useState('7');

    const dispatch = useDispatch();
    const {id} = useParams()

    const statistics = useSelector(state => state.statistics.statistics);
    const language = useSelector(state => state.language.name);

    const inputChangeHandler = e => setNumberOfDays(e.target.value)
    const search = () => {
        if(numberOfDays) {
            dispatch(getStatistics(id, numberOfDays));
        }
    }

    useEffect(() => {
        dispatch(getProductsList());
        dispatch(getStatistics(id, numberOfDays));
    }, [dispatch, id]);

    const dateFormat = 'MMMM Do YYYY, h:mm:ss a';

    const amounts = statistics.statistic && statistics.statistic.map(elem => parseInt(elem.amount))
    const dates = statistics.statistic && statistics.statistic.map(elem => moment(elem.date).format(dateFormat))
    const colors = statistics.statistic && statistics.statistic.map(() => createRandomColor())

    const data = {
        labels: dates,
        datasets: [{
            label: '# of Votes',
            data: amounts,
            backgroundColor: colors,
            borderWidth: 1
        }]
    }

    return (
        <Box mt={1}>
            <Grid container direction='column' spacing={1}>
                <Grid container alignItems='center'>
                    <Grid item>
                        <Typography variant='h2'>
                            {wordList[language].statistic.statisticTitle}
                        </Typography>
                        <Typography variant='h3'>
                            ({statistics.product && statistics.product.name})
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.search}>
                        <Grid container alignItems='center' spacing={1}>
                            <Grid item xs>
                                <FormElement
                                    type='number'
                                    propertyName='numberOfDays'
                                    title={`${wordList[language].statistic.statisticSearchFieldTitle}...`}
                                    onChange={inputChangeHandler}
                                    value={numberOfDays}
                                />
                            </Grid>
                            <Grid item>
                                <Button variant='contained' color='primary' onClick={search}>
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