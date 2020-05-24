import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

import {getProductsList} from "../../store/actions/productsActions";
import FormElement from "../../components/UI/Form/FormElement";

import {wordList} from "../../wordList";


const EditRequestItems = (
    {onChange, onAutoCompleteChange, index, expanded, classes, r, request, onRemove, handleChange,}
) => {

    const products = useSelector(state => state.products.productsList);
    const language = useSelector(state => state.language.name);
    const dispatch = useDispatch();

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
                        aria-label={'check'}
                    >
                        <Box className={classes.heading}>
                            <Chip label={(wordList[language].editRequestItems.title)+(r.product ? r.product.name : '')} variant="outlined" />
                            <Chip label={(wordList[language].editRequestItems.qty)+(r.product ? r.product.amount : '')} variant="outlined" />
                        </Box>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Box style={{width: '100%', marginBottom: "10px"}}>
                            {products[0] && (
                                <Grid item>
                                    <Autocomplete
                                        id={'free-solo-demo' + index}
                                        options={products}
                                        value={products.find(elem => elem.name === r.product.name)}
                                        getOptionLabel={option => option.name}
                                        className={classes.autocomplete}
                                        onChange={(value, element) => onAutoCompleteChange(element, index)}
                                        renderInput={(params) =><>
                                            <TextField
                                                {...params}
                                                required
                                                value={'Продукт-1'}
                                                label={wordList[language].editRequestItems.chooseProd}
                                                variant="outlined"
                                                id={'title'+index}
                                                name='title'
                                                title='Название'
                                            />
                                            {r.product && <><b>На складе есть: </b> {r.product.amount}</>}
                                        </>}
                                    />
                                </Grid>
                            )}

                            <Grid item>
                                <FormElement
                                    required
                                    id={'amount'+index}
                                    propertyName='amount'
                                    title={wordList[language].editRequestItems.inputQty}
                                    value={request.products[index].amount}
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

export default EditRequestItems;