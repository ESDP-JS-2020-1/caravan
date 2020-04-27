import React from 'react';
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

const AddProductItem = (
	{onChange, index, expanded, classes, p, product, onRemove, handleChange, fileChange}
) => {
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
							Название: {p.name}
							Количество: {p.amount}
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Box style={{width: '100%', marginBottom: "10px"}}>
							<Grid item>
								<FormElement
									id='name'
									required
									propertyName='name'
									title='Название'
									value={product[index].name}
									onChange={(e) => onChange(e, index)}
								/>
							</Grid>
							<Grid item>
								<FormElement
									id='amount'
									required
									propertyName='amount'
									title='Количество'
									value={product[index].amount}
									onChange={(e) => onChange(e, index)}
								/>
							</Grid>
							<Grid item>
								<FormElement
									id='price'
									propertyName='price'
									title='Цена'
									value={product[index].price}
									onChange={(e) => onChange(e, index)}
								/>
							</Grid>
							<Grid item>
								<FormElement
									index={index}
									propertyName='image'
									title='image'
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