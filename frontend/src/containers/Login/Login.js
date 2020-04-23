import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import FormElement from "../../components/UI/Form/FormElement";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Spinner from "../../components/UI/Spinner/Spinner";

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
  formBtn = {
    marginTop: '1%',
    display: 'block',
    textAlign: 'center',
    button: {
      fontWeight: 'bold',
      width: '100%',
      minHeight: '50px'
    }
  };
  typography = {
    color: '#0d47a1',
    textAlign: 'center',
    text: {
      borderBottom: '2px solid #0d47a1',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      marginBottom: '3%',
    }
  };

  render() {
    if (this.props.loading) {
      return (
        <Box component="div" boxShadow={10}>
          <Spinner/>
        </Box>
      )
    }
    return (
      <Container>
        <Grid style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
          <Box component="div" boxShadow={10} p={5}>
            <Box style={this.typography} component={'span'}>
              <Typography style={this.typography.text} variant="h6" gutterBottom>
                Login
              </Typography>
            </Box>
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
                  <Alert severity="error">{this.props.error.message}</Alert>
                )}
              </Box>
              <Box component="span" style={this.formBtn}>
                <Button style={this.formBtn.button} variant="contained" type="submit" color="primary" id="btn">
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