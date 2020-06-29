import React from 'react';
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
import MarketInfo from "./containers/MarketInfo/MarketInfo";

import "./index.css"
import './App.css';
import EditGroup from "./containers/EditGroup/EditGroup";
import Trash from "./containers/Trash/Trash";
import WsTest from "./containers/WsTest/WsTest";


import Statistics from "./containers/Statistics/Statistics";
import Container from "@material-ui/core/Container";
import Copyright from "./components/Copyright/Copyright";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSelector} from "react-redux";
import Spinner from "./components/UI/Spinner/Spinner";
import DownloadApp from "./containers/DownloadApp/DownloadApp";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    contentBlock: {
        marginBottom: 'auto'
    },
    footer: {
        maxHeight: '150px',
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor: '#0d47a1'
    },
}));



function App() {
    const classes = useStyles();
    const loading = useSelector(state => state.loading.loading);
    return (
        <>
            {loading && <Spinner/>}
            <div className={classes.root}>
                <div className={classes.contentBlock}>
                    <ReactNotification/>
                    <Navigation/>
                    <Switch>
                        <PrivateRoute path="/" exact component={ProductList}/>
            
                        <Route path="/login" exact component={Login}/>

                        <PrivateRoute path="/users/:id/market_info/:page/:limit" roles={['getRequest']} exact component={MarketInfo}/>
                        <PrivateRoute path="/users" roles={['getUser']} exact component={UsersList}/>
                        <PrivateRoute path="/users/new" roles={['addUser']} exact component={AddUser}/>
                        <PrivateRoute path="/users/:id" roles={['getUser']} exact component={UserInfo}/>
                        <PrivateRoute path="/users/role/:id" roles={['getUser']} exact component={UsersList}/>
                        <PrivateRoute path="/users/edit/:id" roles={['editUser']} exact component={EditUser}/>

                        <PrivateRoute path="/products" exact component={ProductList}/>
                        <PrivateRoute path="/product/add" exact roles={['addProduct']} component={AddProduct}/>
                        <PrivateRoute path="/product/edit/:id" exact roles={['editProduct']} component={EditProduct}/>
                        <PrivateRoute path="/statistics" exact roles={['getStatistic']} component={Statistics}/>

                        <PrivateRoute path="/history/:page/:limit" exact roles={['viewHistory']} component={Histories}/>

                        <PrivateRoute path="/requests" exact component={RequestList}/>
                        <PrivateRoute path="/requests/new" roles={['addRequest']} exact component={AddNewRequest}/>
                        <PrivateRoute path="/requests/:id" exact component={RequestInfo}/>
                        <PrivateRoute path="/requests/edit/:id" exact roles={['editRequest']} component={EditRequest}/>

                        <PrivateRoute path="/groups" exact component={GroupsList}/>
                        <PrivateRoute path="/groups/new" exact roles={['addGroup']} component={AddGroup}/>
                        <PrivateRoute path="/groups/edit/:id" roles={['editGroup']} exact component={EditGroup}/>
                        <PrivateRoute path="/groups/:id" exact component={GroupInfo}/>

                        <PrivateRoute path="/trash/:type" roles={['getTrash']} component={Trash}/>

                        <PrivateRoute path="/downloadApp" roles={['downloadApp']} component={DownloadApp}/>

                        <Route path="/ws" exact component={WsTest}/>
        
                    </Switch>
                </div>
                <footer className={classes.footer}>
                    <Container style={{margin: '0 auto', width: '330px'}} maxWidth="sm">
                        <Copyright/>
                    </Container>
                </footer>
            </div>
        </>
    );
}

export default App;
