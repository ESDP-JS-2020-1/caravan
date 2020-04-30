import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@material-ui/lab/Alert";
import {createRequest, createRequestInit} from "../../store/actions/requestsActions";
import AddNewRequestItem from "./AddNewRequestItem/AddNewRequestItem";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	formBtn: {
		marginTop: '1%',
		display: 'flex',
		justifyContent: 'space-between',
		textAlign: 'center',
	},
	formButton: {
		fontWeight: 'bold',
		width: '49%',
		minHeight: '50px'
	},
	typography: {
		color: '#0d47a1',
		textAlign: 'center',
	},
	typographyText: {
		borderBottom: '2px solid #0d47a1',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		marginBottom: '3%',
	},
	linkBtn: {
		color: '#0d47a1',
		background: 'transparent'
	}
}));

const AddNewRequest = () => {
	const classes = useStyles();

	const dispatch = useDispatch();

	const error = useSelector(state => state.requests.error);

	const [request, setRequest] = useState([{
		title: '',
		amount: '',
		comment: '',
	}]);

	const [expanded, setExpanded] = React.useState(false);

	const inputChangeHandler = (e, i) => {
		let newRequest = [...request];
		newRequest[i][e.target.name] = e.target.value;

		setRequest(newRequest);

	};

	const autoCompleteChangeHandler = (e, i) => {
		let newRequest = [...request];
		newRequest[i]['title'] = e.target.innerHTML;

		setRequest(newRequest);
	};

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const addRequest = (e) => {
		e.preventDefault();

		const newRequest = request[0] ? [...request, {
			title: '',
			amount: '',
			comment: '',
		}] : [{
			title: '',
			amount: '',
			comment: '',
		}];

		setRequest(newRequest)
	};

	const removeRequest = id => {
		const requests = [...request];
		requests.splice(id, 1);

		setRequest(requests);
	};

	const submitFormHandler = async e => {
		e.preventDefault();

		dispatch(createRequest(request));
	};

	useEffect(() => {
		dispatch(createRequestInit())
	}, [dispatch]);

	return (
		<Container>
			<Grid style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
				<Box component="div" p={5} style={{textAlign: 'center'}}>
					<Button
						className={classes.linkBtn}
						variant="contained"
						component={NavLink}
						to='/products'
					>
						Доступный товар
					</Button>
				</Box>
				<Box component="div" boxShadow={10} p={5}>
					<Box className={classes.typography} component={'span'}>
						<Typography className={classes.typographyText} variant="h6" gutterBottom>
							Создать заявку
						</Typography>
					</Box>
					<form onSubmit={submitFormHandler}>
						<Grid container direction='column' spacing={1}>

							{request.map((r, i) => (
								<AddNewRequestItem
									key={i}
									request={request}
									expanded={expanded}
									classes={classes}
									onChange={inputChangeHandler}
									onAutoCompleteChange={autoCompleteChangeHandler}
									handleChange={handleChange}
									onRemove={removeRequest}
									index={i}
									r={r}
								/>
							))}

							{error && <Grid item>
								<Alert severity='error'>{error}</Alert>
							</Grid>}
							<Grid item>
								<Box className={classes.formBtn} component="span">
									<Button
										onClick={addRequest}
										className={classes.formButton}
										variant='contained'
										color='primary'
									>
										Добавить
									</Button>
									<Button
										className={classes.formButton}
										variant='contained'
										color='primary'
										type='submit'
										disabled={!request[0]}
									>
										Создать заявку
									</Button>
								</Box>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Grid>
		</Container>
	);
};

export default AddNewRequest;