import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";

function App() {
  return (
      <>
        <header>
          {/*место для header*/}
        </header>
        <Switch>
          <Route path="/login" exact component={Login}/>
        </Switch>
      </>
  );
}

export default App;
