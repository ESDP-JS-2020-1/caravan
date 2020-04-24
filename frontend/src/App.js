import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import "./index.css"
import UsersList from "./components/UsersList/UsersList";
import Container from "@material-ui/core/Container";
import AddUser from "./components/AddUser/AddUser";
import EditUser from "./containers/EditUser/EditUser";
import ReactNotification from 'react-notifications-component'


function App() {
  return (
    <div>
      <ReactNotification/>
      <Navigation/>
      <Container>
        <Switch>
          <Route path="/login" exact component={Login}/>
          <Route path="/users" exact component={UsersList}/>
          <Route path="/users/new" exact component={AddUser}/>
          <Route path="/users/edit/:id" exact component={EditUser}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
