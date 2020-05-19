import React from 'react';

import Container from "@material-ui/core/Container";
import ReactNotification from 'react-notifications-component'
import {Route, Switch} from "react-router-dom";

import Login from "./containers/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import UsersList from "./components/UsersList/UsersList";
import AddUser from "./containers/AddUser/AddUser";
import EditUser from "./containers/EditUser/EditUser";
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
import AddGroup from "./containers/AddGroup/AddGroup";
import GroupsList from "./containers/GroupsList/GroupsList";
import GroupInfo from "./containers/GroupInfo/GroupInfo";

import "./index.css"
import './App.css';
import EditGroup from "./containers/EditGroup/EditGroup";
import Statistics from "./containers/Statistics/Statistics";


function App() {
    return (
        <div>
            <ReactNotification/>
            <Navigation/>
            <Container>
                <Switch>
                    <Route path="/" exact component={ProductList}/>
                    <Route path="/login" exact component={Login}/>
                    <PrivateRoute path="/users" roles={['getUser']} exact component={UsersList}/>
                    <PrivateRoute path="/user/:id" roles={['getGroup']} exact component={UserInfo}/>
                    <PrivateRoute path="/users/new" roles={['addUser']} exact component={AddUser}/>
                    <PrivateRoute path="/users/edit/:id" roles={['editUser']} exact component={EditUser}/>
                    <PrivateRoute path="/users/:id" exact roles={['getUser']} component={UsersList}/>

                    <PrivateRoute path="/products" exact component={ProductList}/>
                    <PrivateRoute path="/product/add" exact roles={['addProduct']} component={AddProduct}/>
                    <PrivateRoute path="/product/edit/:id" exact roles={['editProduct']} component={EditProduct}/>
                    <PrivateRoute path="/product/stat/:id" exact roles={['editProduct']} component={Statistics}/>

                    <PrivateRoute path="/history" exact roles={['viewHistory']} component={Histories}/>

                    <PrivateRoute path="/requests" exact component={RequestList}/>
                    <PrivateRoute path="/requests/new" roles={['addRequest']} exact component={AddNewRequest}/>
                    <PrivateRoute path="/requests/:id" exact component={RequestInfo}/>
                    <PrivateRoute path="/requests/edit/:id" exact roles={['editRequest']} component={EditRequest}/>

                    <PrivateRoute path="/groups" exact  component={GroupsList}/>
                    <PrivateRoute path="/groups/new" exact roles={['addGroup']} component={AddGroup}/>
                    <PrivateRoute path="/groups/edit/:id" roles={['editGroup']} exact component={EditGroup}/>
                    <PrivateRoute path="/groups/:id" exact component={GroupInfo}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
