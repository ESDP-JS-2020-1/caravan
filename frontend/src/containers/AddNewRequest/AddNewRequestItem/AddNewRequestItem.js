import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Box from "@material-ui/core/Box";
import FormElement from "../../../components/UI/Form/FormElement";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch, useSelector} from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {getProductsList} from "../../../store/actions/productsActions";


const AddNewRequestItem = (
	{onChange, onAutoCompleteChange, index, expanded, classes, r, request, onRemove, handleChange}
) => {

	const products = useSelector(state => state.products.productsList);
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
					>
						<Typography className={classes.heading}>
							Название: {r.title}
							Количество: {r.amount}
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Box style={{width: '100%', marginBottom: "10px"}}>
							{products && (
								<Grid item>
									<Autocomplete
										id="combo-box-demo"
										options={products}
										getOptionLabel={(option) => option.name}
										style={{ width: '100%', marginBottom: '2%' }}
										onChange={(e) => onAutoCompleteChange(e, index)}

										renderInput={(params) =>
											<TextField
												{...params}
												required
												label="Название"
												variant="outlined"
												id='title'
												name='title'
												title='Название'
											/>
										}
									/>
								</Grid>
							)}

							<Grid item>
								<FormElement
									required
									id='amount'
									propertyName='amount'
									title='Количество'
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