import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRequest} from "../../store/actions/requestsActions";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  flex: {
    display: 'flex',
  },
  padding: {
    padding: '10px 0'
  },
  typography: {
    color: '#0d47a1',
    textAlign: 'center',
  },
  typographyText: {
    borderBottom: '2px solid #0d47a1',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '3%',
  },
});

const RequestInfo = props => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const request = useSelector(state => state.requests.request);

  useEffect(() => {
    dispatch(getRequest(props.match.params.id))
  }, [dispatch, props.match.params.id]);

  return (
    <Container>
      {console.log(request)}
      <Paper style={{width: '70%', padding: '20px', margin: '0 auto', marginTop: '5%'}} elevation={3}>
        <Box className={classes.typography} component={'span'}>
          <Typography className={classes.typographyText} variant="h6" gutterBottom>
            Информация о заявке
          </Typography>
        </Box>

        <Typography className={classes.padding} variant='h5'> <b>Пользователь </b>{request.user && request.user.displayName}</Typography>

        <Typography className={classes.padding} variant='h5'><b>Телефон </b>{request.user && request.user.phone}</Typography>

        <Typography className={classes.padding} variant='h5'><b>Дата создания </b>{moment(request.date).format('MMMM Do YYYY, h:mm:ss a')}
        </Typography>
        <Divider/>
        <Typography className={classes.padding} variant='h5'><b>Магазин </b>{request.user && request.user.companyName}</Typography>

        <Typography className={classes.padding} variant='h5'><b>Адрес </b>{request.user && request.user.address}</Typography>
        <Divider/>

        <Box style={{padding: '10px'}} border={1} borderRadius={6} borderColor='#cccccc'>
          <Typography  variant='h5'><b>Продукты: </b></Typography>
          {request.products && request.products.map((elem, id) => (
            <Card key={id}>
              <CardContent className={classes.flex}>
                <Typography variant="h6" style={{marginRight: '10px'}}>
                  Название: {elem.title}
                </Typography>
                <Typography variant="h6" component="h2">
                  Количество: {elem.amount}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default RequestInfo;