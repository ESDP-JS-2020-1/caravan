import React from 'react';

import {useSelector} from "react-redux";

import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import FormElement from "../../../components/UI/Form/FormElement";
import {wordList} from "../../../wordList";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";


const AddProductItem = (
    {checkboxChangeHandler, onChange, index, expanded, classes, p, product, onRemove, autoChange, handleChange, fileChange}
) => {

    const language = useSelector(state => state.language.name);

    const productsType = [
        {title: 'кг'},
        {title: 'литр'},
        {title: 'грамм'},
        {title: 'штук'}
    ];

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
                        <Typography className={classes.heading}>
                            {wordList[language].addProductItem.inputTitle}: {p.name}
                            {wordList[language].addProductItem.inputQty}: {p.amount}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Box className={classes.mainBox}>
                            <Grid item>
                                <FormElement
                                    id='name'
                                    required
                                    propertyName='name'
                                    title={wordList[language].addProductItem.inputTitle}
                                    value={product[index].name}
                                    onChange={(e) => onChange(e, index)}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    type="number"
                                    id='amount'
                                    required
                                    propertyName='amount'
                                    title={wordList[language].addProductItem.inputQty}
                                    value={product[index].amount}
                                    onChange={(e) => onChange(e, index)}
                                />
                                <Autocomplete
                                    id="productType"
                                    freeSolo
                                    onChange={(e, value) => autoChange(e, index, value)}
                                    options={productsType.map((option) => option.title)}
                                    renderInput={(params) => (
                                        <TextField {...params} label={wordList[language].addProductItem.inputType}
                                                   margin="normal" variant="outlined" id="productType"/>
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    id='price'
                                    propertyName='price'
                                    title={wordList[language].addProductItem.inputPrice}
                                    value={product[index].price}
                                    onChange={(e) => onChange(e, index)}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    type='checkbox'
                                    propertyName='isRefrigeratorRequired'
                                    title={wordList[language].addProductItem.inputRefrigerator}
                                    value={product[index].isRefrigeratorRequired}
                                    onChange={(e) => checkboxChangeHandler(e, index)}
                                />
                            </Grid>
                            <Grid item>
                                <FormElement
                                    index={index}
                                    propertyName='image'
                                    title={wordList[language].addProductItem.inputImg}
                                    value={product[index].image}
                                    onChange={(e) => fileChange(e, index)}
                                    type='file'
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

export default AddProductItem;