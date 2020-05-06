import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import "./index.css"
import UsersList from "./components/UsersList/UsersList";
import Container from "@material-ui/core/Container";
import AddUser from "./containers/AddUser/AddUser";
import EditUser from "./containers/EditUser/EditUser";
import ReactNotification from 'react-notifications-component'
import AddProduct from "./containers/AddProduct/AddProduct";
import ProductList from "./containers/ProductList/ProductList";
import EditProduct from "./containers/EditProduct/EditProduct";
import Histories from "./containers/Histories/Histories";
import AddNewRequest from "./containers/AddNewRequest/AddNewRequest";
import RequestList from "./containers/RequestList/RequestList";
import RequestInfo from "./containers/RequestInfo/RequestInfo";
import EditRequest from "./containers/EditRequest/EditRequest";
import UserInfo from "./containers/UserInfo/UserInfo";
import PrivateRoute from "./components/HOC/PrivateRoute/PrivateRoute";



function App() {
    return (
        <div>
            <ReactNotification/>
            <Navigation/>
            <Container>
                <Switch>
                    <Route path="/login" exact component={Login}/>
                    <PrivateRoute path="/users" roles={['admin', 'operator']} exact component={UsersList}/>
                    <PrivateRoute path="/user/:id" roles={['admin', 'operator']} exact component={UserInfo}/>
                    <PrivateRoute path="/users/new" roles={['admin']} exact component={AddUser}/>
                    <PrivateRoute path="/users/edit/:id" roles={['admin']} exact component={EditUser}/>
                    <PrivateRoute path="/users/:id" exact roles={['admin', 'operator']} component={UsersList}/>
                    <PrivateRoute path="/products" exact component={ProductList}/>
                    <PrivateRoute path="/product/add" exact roles={['admin']} component={AddProduct}/>
                    <PrivateRoute path="/product/edit/:id" exact roles={['admin']} component={EditProduct}/>
                    <PrivateRoute path="/history" exact roles={['admin']} component={Histories}/>
                    <PrivateRoute path="/requests" exact component={RequestList}/>
                    <PrivateRoute path="/requests/new" roles={['admin', 'market']} exact component={AddNewRequest}/>
                    <PrivateRoute path="/requests/:id" exact component={RequestInfo}/>
                    <PrivateRoute path="/requests/edit/:id" exact roles={['admin']} component={EditRequest}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
