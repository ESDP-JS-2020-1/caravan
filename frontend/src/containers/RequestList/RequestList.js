import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

import RequestListItem from "./RequestListItem";
import {getRequests} from "../../store/actions/requestsActions";
import {wordList} from "../../wordList";
import Grid from "@material-ui/core/Grid";
import RequestCardItem from "./RequestCardItem";
import Spinner from "../../components/UI/Spinner/Spinner";

const RequestList = () => {
	const dispatch = useDispatch();

	const requests = useSelector(state => state.requests.list);
	const user = useSelector(state => state.users.user);
	const language = useSelector(state => state.language.name);

	useEffect(() => {
		dispatch(getRequests());
	}, [dispatch]);

	const loading = useSelector(state => state.loading.loading)
	if (loading) {
		return <Spinner/>
	}

	let requestsList = requests.map((elem) => (
		<RequestListItem
			key={elem._id}
			id={elem._id}
			user={elem.user}
			status={elem.status}
			userRoleInfo={user.role}
			date={elem.date}
		/>
	));

	if (user && user.role === 'courier') {
		requestsList = requests.map(elem => (
			<RequestListItem
				key={elem.request._id}
				id={elem.request._id}
				status={elem.status}
				user={elem.request.user}
				date={elem.request.date}
			/>
		))
	}

	return (
		<>
			{window.innerWidth >= 1200 &&
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<TableContainer component={Paper}>
					<Table aria-label="caption table">
						<TableHead>
							<TableRow>
								<TableCell> <b>{wordList[language].requestList.tableUser}</b> </TableCell>
								<TableCell> <b>{wordList[language].requestList.tableDate}</b> </TableCell>
								<TableCell> <b>{wordList[language].requestList.tableStatus}</b> </TableCell>
								<TableCell> </TableCell>
								<TableCell> </TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{requestsList}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			}

			{window.innerWidth <= 1200 &&
			<>
                <RequestCardItem/>
			</>
			}
		</>
	);
};

export default RequestList;