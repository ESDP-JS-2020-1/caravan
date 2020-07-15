import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {apiURL} from "../../config";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {wordList} from "../../wordList";
import {checkPermission} from "../../CheckPermission";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles({
    root: {width: '100%', padding: '10px'},
    media: {
        height: 200,
    },
    typography: {
        fontSize: 14
    },
    padding: {
        padding: '10px'
    }
});

const ProductCard = (props) => {
    const classes = useStyles();
    const language = useSelector(state => state.language.name);
    return (
        <Grid item xs={12} sm={6} md={4} className={classes.padding}>

            <Card style={{padding: '1px'}}>
                {props.image && <CardMedia
                    className={classes.media}
                    image={apiURL.url + '/uploads/productImage/' + props.image}
                    title={props.title}

                />}
                <CardContent>
                    <Typography className={classes.typography} gutterBottom variant="h5"
                                component="h5"><b>{wordList[language].productList.name}: </b> {props.title}</Typography>
                    <Typography className={classes.typography} gutterBottom variant="h5"
                                component="h5"><b>{wordList[language].productList.quantity}: </b> {props.amount}</Typography>
                    <Typography className={classes.typography} gutterBottom variant="h5"
                                component="h5"><b>{wordList[language].productList.productType}: </b> {props.productType}</Typography>
                    <Typography className={classes.typography} gutterBottom variant="h5"
                                component="h5"><b>{wordList[language].productList.price}: </b> {props.price}</Typography>
                    <Typography className={classes.typography} gutterBottom variant="h5" component="h5">
                        <b>{wordList[language].productList.isRefrigeratorRequired}: </b>
                        {props.isRefrigeratorRequired ?
                            wordList[language].necessarily :
                            wordList[language].notNecessary
                        }
                    </Typography>

                    {checkPermission('editProduct')
                    && <IconButton xs={12} sm={12}
                                   variant='contained'
                                   color="primary"
                                   component={NavLink}
                                   to={`/product/edit/${props.id}`}
                                   style={{margin: '10px 0 7px 0'}}
                                   id={'productEdit' + props.index}
                    >
                        <EditIcon/>
                    </IconButton>}
                </CardContent>

            </Card>

        </Grid>
    );
};


export default ProductCard;