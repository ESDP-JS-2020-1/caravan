import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import FormElement from "../../components/UI/Form/FormElement";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";

class Login extends Component {
    state = {
        username: '',
        password: '',
    };
    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();

        this.props.loginUser({...this.state});
    };
    render() {
        return (
            <Container>
                <Grid style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={5} sm={6} ml={8}>
                    <Box component="div">
                        <form onSubmit={this.submitFormHandler}>
                            <FormElement
                                required
                                propertyName="username"
                                title="Username"
                                value={this.state.username}
                                onChange={this.inputChangeHandler}
                                type="text"
                                autoComplete="current-username"
                                placeholder="Enter username you registered with"
                            />
                            <FormElement
                                required
                                propertyName="password"
                                title="Password"
                                value={this.state.password}
                                onChange={this.inputChangeHandler}
                                type="password"
                                autoComplete="current-password"
                                placeholder="Enter password"
                            />
                            <Box>
                                {this.props.error && (
                                    <Alert severity="error">{this.props.error.error}</Alert>
                                )}
                            </Box>
                            <Box component="span">
                                <Button type="submit" color="primary">
                                    Login
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.users.loginLoading,
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);