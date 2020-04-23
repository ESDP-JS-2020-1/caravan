import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./containers/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import "./index.css"
import UsersList from "./components/UsersList/UsersList";
import Container from "@material-ui/core/Container";

function App() {
	return (
		<>
			<ToastContainer autoClose={2000}/>
			<Navigation/>
			<Container>
				<Switch>
					<Route path="/login" exact component={Login}/>
					<Route path="/users" exact component={UsersList}/>
				</Switch>
			</Container>
		</>
	);
}

export default App;
