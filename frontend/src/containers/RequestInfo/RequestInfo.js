import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getRequest, nominatedRequest} from "../../store/actions/requestsActions";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
  flex: {
    display: 'flex',
  },
  padding: {
    padding: '10px 0'
  },
  margin: {
    margin: '10px 0'
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

  const [showCouriers, setShowCouriers] = useState(false);

  const showCouriersHandler = () => setShowCouriers(!showCouriers);

  return (
    <Container>
      <Paper style={{width: '70%', padding: '20px', margin: '0 auto', marginTop: '5%'}} elevation={3}>
        <Box className={classes.typography} component={'span'}>
          <Typography className={classes.typographyText} variant="h6" gutterBottom>
            Информация о заявке
          </Typography>
        </Box>

        {request.request && <>
          <Typography className={classes.padding} variant='h5'> <b>Пользователь </b>{request.request.user.displayName}</Typography>

          <Typography className={classes.padding} variant='h5'><b>Телефон </b>{request.request.user.phone}</Typography>

          <Typography className={classes.padding} variant='h5'><b>Дата создания </b>{moment(request.date).format('MMMM Do YYYY, h:mm:ss a')}
          </Typography>
          <Divider/>
          <Typography className={classes.padding} variant='h5'><b>Магазин </b>{request.request.user.companyName}</Typography>

          <Typography className={classes.padding} variant='h5'><b>Адрес </b>{request.request.user.address}</Typography>
          <Divider/>

          <Box style={{padding: '10px'}} border={1} borderRadius={6} borderColor='#cccccc'>
            <Typography  variant='h5'><b>Продукты: </b></Typography>
            {request.request.products.map((elem, id) => (
                <Card key={id}>
                  <CardContent className={classes.flex}>
                    <Typography variant="h6" style={{marginRight: '10px'}}>
                      <b>Название:</b> {elem.title}
                    </Typography>
                    <Typography variant="h6" component="h2">
                      <b>Количество:</b> {elem.amount}
                    </Typography>
                  </CardContent>
                </Card>
            ))}
          </Box>
        </>}

        {request.nominatedCourier && <>
          <Typography  variant='h5'><b>Назначенный курьер </b></Typography>
          <Typography  variant='h5'><b>Дата назначения: </b> {moment(request.nominatedCourier.date).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
          <Card>
            <CardContent className={classes.flex}>
              <Typography variant="h6" style={{marginRight: '10px'}}>
                <b>Имя: </b> {request.nominatedCourier.displayName}
              </Typography>
              <Typography variant="h6" style={{marginRight: '10px'}}>
                <b>Телефон: </b> {request.nominatedCourier.phone}
              </Typography>
              <Typography variant="h6" component={NavLink} to={'/user/'+request.nominatedCourier._id}>
                Информация о курьере
              </Typography>
            </CardContent>
          </Card>
        </>}

        {!request.isNominated && <Button
            className={classes.margin}
            variant='contained'
            color='primary'
            onClick={showCouriersHandler}
        >Назначить экспедитору</Button>}

        {showCouriers && !request.isNominated && <Box style={{padding: '10px'}} border={1} borderRadius={6} borderColor='#cccccc'>
          {request.courierList && request.courierList.map((elem, id) => (
              <Card key={id}>
                <CardContent className={classes.flex}>
                  <Typography variant="h6" style={{marginRight: '10px'}}>
                    <b>Имя: </b> {elem.displayName}
                  </Typography>
                  <Typography variant="h6" style={{marginRight: '10px'}}>
                    <b>Телефон: </b> {elem.phone}
                  </Typography>
                  <Typography variant="h6" style={{marginRight: '10px'}}>
                    <b>Холодильник: </b> {elem.carRefrigerator ? 'Есть' : 'Отсутствует'}
                  </Typography>
                  <Button
                      onClick={() => dispatch(nominatedRequest(elem._id, request.request._id))}
                      variant='contained'
                  >Назначить</Button>
                </CardContent>
              </Card>
          ))}
        </Box>}
      </Paper>
    </Container>
  );
};

export default RequestInfo;