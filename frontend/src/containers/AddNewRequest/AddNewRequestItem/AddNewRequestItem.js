import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import FormElement from "../../../components/UI/Form/FormElement";
import {getProductsList} from "../../../store/actions/productsActions";
import {wordList} from "../../../wordList";



const AddNewRequestItem = (
    {onChange, onAutoCompleteChange, index, expanded, classes, r, request, onRemove, handleChange}
) => {

    const products = useSelector(state => state.products.productsList);
    const dispatch = useDispatch();
    const language = useSelector(state => state.language.name);

    useEffect(() => {
        dispatch(getProductsList());
    }, [dispatch]);

    return (

        <Grid container alignItems='center' spacing={1}>
            <Grid item xs={11}>
                <ExpansionPanel expanded={expanded === 'panel' + index}
                                onChange={handleChange('panel' + index)}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id={`panel${index}bh-header`}
                    >
                        <Typography className={classes.heading} id="addNew">
                            {wordList[language].addNewRequestItem.btnTitle}: {r.title}
                            {wordList[language].addNewRequestItem.btnQty}: {r.amount}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Box className={classes.mainBox}>
                            {products && (
                                <Grid item>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={products}
                                        getOptionLabel={option => option.name}
                                        className={classes.autocomplete}
                                        onChange={(e, value) => onAutoCompleteChange(value, index)}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                required
                                                label={wordList[language].addNewRequestItem.btnTitle}
                                                variant="outlined"
                                                id='title'
                                                name='title'
                                                title={wordList[language].addNewRequestItem.btnTitle}
                                            />
                                        }
                                    />
                                </Grid>
                            )}

                            <Grid item>
                                <FormElement
                                    required
                                    id={'amount'}
                                    propertyName='amount'
                                    title={wordList[language].addNewRequestItem.btnQty}
                                    value={request[index].amount}
                                    onChange={(e) => onChange(e, index)}
                                />
                            </Grid>
                        </Box>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
            <Grid item xs={1}>
                <IconButton aria-label="delete" onClick={() => onRemove(index)}>
                    <DeleteIcon fontSize="large"/>
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default AddNewRequestItem;