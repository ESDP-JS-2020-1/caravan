import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import apiURL from "../../apiURL";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {wordList} from "../../wordList";
import {checkPermission} from "../../CheckPermission";
import Grid from "@material-ui/core/Grid";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
    root: {width: '100%', padding: '10px'},
    media: {
        height: 140,
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

                <Card style={{padding:'1px'}}>
                    {props.image && <CardMedia
                        className={classes.media}
                        image={apiURL.url + '/uploads/productImage/' + props.image}
                        title={props.title}

                    />}
                    <CardContent >
                        <Typography className={classes.typography} gutterBottom variant="h5"
                                    component="h5"><b>Название: </b> {props.title}</Typography>
                        <Typography className={classes.typography} gutterBottom variant="h5"
                                    component="h5"><b>Кол-во: </b> {props.amount}</Typography>
                        <Typography className={classes.typography} gutterBottom variant="h5"
                                    component="h5"><b>Тип: </b> {props.productType}</Typography>
                        <Typography className={classes.typography} gutterBottom variant="h5"
                                    component="h5"><b>Цена: </b> {props.price}</Typography>
                        <Typography className={classes.typography} gutterBottom variant="h5" component="h5">
                            <b>Холодильник: </b>
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
                                   id={props.edit}
                                   style={{margin: '10px 0 7px 0'}}
                                       id={'productEdit'+ props.index}
                        >
                            <EditIcon/>
                        </IconButton>}
                        {checkPermission('getStatistic')
                        && <IconButton xs={12} sm={12}
                                   variant='contained'
                                   color="primary"
                                   component={NavLink}
                                   to={`/product/stat/${props.id}/7`}

                        >
                            <EqualizerIcon/>
                        </IconButton>}
                    </CardContent>

                </Card>

        </Grid>
    );
}
export default ProductCard;