import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {getRequests} from "../../store/actions/requestsActions";
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
		width: 350,
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

const RequestCardItem = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const requests = useSelector(state => state.requests.list);
	const language = useSelector(state => state.language.name);


	useEffect(() => {
		dispatch(getRequests());
	}, [dispatch]);

		return (
			<Grid container item className={classes.padding}>
				{requests && requests.map(elem => (
					<Card className={classes.root} key={elem._id}>
						<CardContent>
							<Typography variant="body2" component="p" className={classes.pos}>
								<b>{wordList[language].requestList.tableUser}: </b>{elem.user.displayName}
							</Typography>
							<Typography variant="body2" component="p" className={classes.pos}>
								<b>{wordList[language].requestList.tableDate}: </b>{moment(elem.date).format('MMMM Do YYYY, h:mm:ss a')}
							</Typography>
							<div className={classes.status}>
								<b>{wordList[language].requestList.tableStatus}: </b>
								{elem.status === 'pending' &&
								<Chip label={wordList[language].requestListItem.label_1} className={classes.chip}/>}
								{elem.status === 'performed' &&
								<Chip color='primary' label={wordList[language].requestListItem.label_2} className={classes.chip}/>}
								{elem.status === 'closed' &&
								<Chip color='secondary' label={wordList[language].requestListItem.label_3} className={classes.chip}/>}
							</div>
							<CardActions className={classes.btn}>
								{elem.status !== 'closed' &&
								<IconButton
									aria-label="edit"
									component={NavLink}
									to={`/requests/edit/${elem._id}`}
									id={elem._id}
									exact
								>
									<EditIcon/>
								</IconButton>
								}

								<IconButton
									aria-label="show info"
									component={NavLink}
									to={`/requests/${elem._id}`}
									id={elem.user.role + 'Q' + elem.user.phone}
									exact
								>
									<VisibilityIcon/>
								</IconButton>
							</CardActions>
						</CardContent>
					</Card>
				))}
			</Grid>
		);
};

export default RequestCardItem;