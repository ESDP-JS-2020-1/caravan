import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formBtn: {
    marginTop: '1%',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  formButton: {
    fontWeight: 'bold',
    width: '49%',
    minHeight: '50px'
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
  phoneInput: {
    width: '100%',
  }
}));
const AddProduct = () => {
  const classes = useStyles();

  const [product, setProduct] = useState([{
    name: '',
    amount: '',
    price: '',
  }]);

  const inputChangeHandler = (e, i) => {
    let newProduct = [...product];
    newProduct[i][e.target.name] = e.target.value;
    setProduct(newProduct)
  };

  const addProduct = (e) => {
    e.preventDefault();

    const newProduct = product[0] ? [...product, {
      name: '',
      amount: '',
      price: '',
    }] : [{
      name: '',
      amount: '',
      price: '',
    }];

    setProduct(newProduct)
  };

  const deleteProduct = id => {
    const products = [...product];
    products.splice(id, 1);

    setProduct(products);
  };

  const onSubmit = e => {
    e.preventDefault();

  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container>
      <Grid style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
        <Box component="div" boxShadow={10} p={5}>
          <Box className={classes.typography} component={'span'}>
            <Typography className={classes.typographyText} variant="h6" gutterBottom>
              Добовление продуктов
            </Typography>
          </Box>
          <form onSubmit={onSubmit}>
            <Grid container direction='column' spacing={1}>

              {product.map((p, i) => (
                <Grid container key={i} alignItems='center' spacing={1}>
                  <Grid item xs={11}>
                    <ExpansionPanel expanded={expanded === 'panel' + i}
                                    onChange={handleChange('panel' + i)}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id={`panel${i}bh-header`}
                      >
                        <Typography className={classes.heading}>
                          Название: {p.name}
                          Количество: {p.amount}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Box style={{width: '100%', marginBottom: "10px"}}>
                          <Grid item>
                            <FormElement
                              required
                              propertyName='name'
                              title='Название'
                              value={product[i].name}
                              onChange={(e) => inputChangeHandler(e, i)}
                            />
                          </Grid>
                          <Grid item>
                            <FormElement
                              required
                              propertyName='amount'
                              title='Количество'
                              value={product[i].amount}
                              onChange={(e) => inputChangeHandler(e, i)}
                            />
                          </Grid>
                          <Grid item>
                            <FormElement
                              propertyName='price'
                              title='Цена'
                              value={product[i].price}
                              onChange={(e) => inputChangeHandler(e, i)}
                            />
                          </Grid>
                        </Box>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton aria-label="delete" onClick={() => deleteProduct(i)}>
                      <DeleteIcon fontSize="large"/>
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              {/*{error && <Grid item>*/}
              {/*    <Alert severity='error'>{error}</Alert>*/}
              {/*</Grid>}*/}
              <Grid item>
                <Box className={classes.formBtn} component="span">
                  <Button
                    onClick={addProduct}
                    className={classes.formButton}
                    variant='contained'
                    color='primary'
                  >
                    Добавить
                  </Button>
                  <Button
                    className={classes.formButton}
                    variant='contained'
                    color='primary'
                    type='submit'
                  >
                    Сохранить
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Container>
  );
};

export default AddProduct;