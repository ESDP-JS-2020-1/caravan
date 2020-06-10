import React from 'react';
import {useSelector} from "react-redux";
import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import {NavLink} from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import {wordList} from "../../wordList";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	pos: {
		marginBottom: 16,
		fontSize: '18px'
	},
	status: {
		fontSize: '18px',
	},
	chip: {
		fontSize: '16px'
	},
	btn: {
		justifyContent: 'space-around',
		marginTop: 12,
	},
	padding: {
		padding: '10px'
	}
});

const RequestCardItem = props => {
	const classes = useStyles();

	const language = useSelector(state => state.language.name);


	return (
		<Grid item xs={12} sm={6} md={4} className={classes.padding}>
			<Card className={classes.root}>
				<CardContent>
					<Typography variant="body2" component="p" className={classes.pos}>
						<b>{wordList[language].requestList.tableUser}: </b>{props.user.displayName}
					</Typography>
					<Typography variant="body2" component="p" className={classes.pos}>
						<b>{wordList[language].requestList.tableDate}: </b>{moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}
					</Typography>
					<div className={classes.status}>
						<b>{wordList[language].requestList.tableStatus}: </b>
						{props.status === 'pending' &&
						<Chip label={wordList[language].requestListItem.label_1} className={classes.chip}/>}
						{props.status === 'performed' &&
						<Chip color='primary' label={wordList[language].requestListItem.label_2}
							  className={classes.chip}/>}
						{props.status === 'closed' &&
						<Chip color='secondary' label={wordList[language].requestListItem.label_3}
							  className={classes.chip}/>}
					</div>
					<CardActions className={classes.btn}>
						{props.status !== 'closed' &&
						<IconButton
							aria-label="edit"
							component={NavLink}
							to={`/requests/edit/${props.id}`}
							id={props.id}
							exact
						>
							<EditIcon/>
						</IconButton>
						}

						<IconButton
							aria-label="show info"
							component={NavLink}
							to={`/requests/${props.id}`}
							id={props.user.role + 'Q' + props.user.phone}
							exact
						>
							<VisibilityIcon/>
						</IconButton>
					</CardActions>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default RequestCardItem;