import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {useParams} from 'react-router-dom'

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import {getTrash} from "../../store/actions/trashActions";


const useStyles = makeStyles({
    spinnerBlock: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: "-40px 0 0 -40px"
    }
})

const Trash = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { type } = useParams()

    const [sortDate, setSortDate] = useState(false);

    let trash = useSelector(state => state.trashReducer.trash);
    const loading = useSelector(state => state.trashReducer.loading);

    const changeDateSort = () => setSortDate(!sortDate)

    const title = trash && trash.length !== 0 ? 'Козина' : 'Корзина пока пуста'

    useEffect(() => {
        dispatch(getTrash(type))
    }, [dispatch, type])
    useEffect(() => {
        if (trash) {
            if (!sortDate) trash.sort((a, b) => {
                const c = new Date(a.date);
                const d = new Date(b.date);
                return c-d
            })
            else trash.sort((a, b) => {
                const c = new Date(a.date);
                const d = new Date(b.date);
                return d-c
            })
        }
    }, [sortDate, trash])

    const types = [
        {value: 'all', title: 'Все'},
        {value: 'users', title: 'Пользователи'},
        {value: 'requests', title: 'Заявки'},
        {value: 'products', title: 'Продукты'},
        {value: 'groups', title: 'Группы'},
    ]

    if (loading) {
        return (
            <div className={classes.spinnerBlock}>
                <CircularProgress className={classes.spinner}/>
            </div>
        )
    }

    return trash && (
        <Container>
            <Box mt={1}>
                <Grid container direction='column' spacing={2}>
                    <Grid item>
                        <Typography variant='h3' paragraph>
                            {title}
                        </Typography>
                    </Grid>
                    {trash.length > 0 && <Grid item>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button
                                className={!sortDate && 'Mui-disabled'}
                                onClick={changeDateSort}
                            >{'От нового к старому'}</Button>
                            <Button
                                className={sortDate && 'Mui-disabled'}
                                onClick={changeDateSort}
                            >{'От старого к новому'}</Button>
                        </ButtonGroup>
                    </Grid>}
                    <Grid item>
                        <Autocomplete
                            id="combo-box-demo"
                            options={types}
                            getOptionLabel={(option) => option.title}
                            onChange={(e, value) => dispatch(getTrash(value.value || 'all'))}
                            value={types.find(e => e.value === type)}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label={'Фильтр по типу'} variant="outlined" />}
                        />
                    </Grid>
                    <Grid item container>
                        <TableContainer component={Paper}>
                            {trash.length !== 0 && <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>{'Название'}</b></TableCell>
                                        <TableCell><b>{'Дата'}</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {trash.map(info => {

                                        let documentInfo;
                                        const date = moment(info.date).format('MMMM Do YYYY, h:mm:ss a')

                                        if (info.displayName) documentInfo = info.displayName;
                                        if (info.name) documentInfo = info.name;
                                        if (info.status) documentInfo = 'звавку';
                                        return (
                                            <TableRow key={info._id}>
                                                <TableCell>{documentInfo}</TableCell>
                                                <TableCell>{date}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>}
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Trash;