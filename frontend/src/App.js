import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import "./index.css"
function App() {
  return (
      <>
        <Navigation/>
        <Switch>
          <Route path="/login" exact component={Login}/>
        </Switch>
      </>
  );
}

export default App;
