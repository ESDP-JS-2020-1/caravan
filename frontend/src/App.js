import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import "./index.css"
import UsersList from "./components/UsersList/UsersList";
import Container from "@material-ui/core/Container";
import AddUser from "./components/AddUser/AddUser";
function App() {
  return (
      <>
        <Navigation/>
        <Container>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/users" exact component={UsersList}/>
                <Route path="/users/new" exact component={AddUser}/>
            </Switch>
        </Container>
      </>
  );
}

export default App;
