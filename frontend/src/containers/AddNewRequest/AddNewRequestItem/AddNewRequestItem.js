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

const AddNewRequestItem = (
	{onChange, index, expanded, classes, r, request, onRemove, handleChange}
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
							Название: {r.title}
							Количество: {r.amount}
							Комментарий: {r.comment}
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Box style={{width: '100%', marginBottom: "10px"}}>
							<Grid item>
								<FormElement
									required
									id='title'
									propertyName='title'
									title='Название'
									value={request[index].title}
									onChange={(e) => onChange(e, index)}
								/>
							</Grid>
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
							<Grid item>
								<FormElement
									id='comment'
									propertyName='comment'
									title='Комментарий'
									value={request[index].comment}
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