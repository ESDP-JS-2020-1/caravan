import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import apiURL from "../../apiURL";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {wordList} from "../../wordList";
import {checkPermission} from "../../CheckPermission";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {width: '100%'},
    media: {
        height: 140,
    },
    typography:{
        fontSize: 14
    },
    cardAction:{
        display:'flex',
        flexDirection:'column',
    },
    contentText:{
        textAlign:'center'
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
        <Card  className={classes.root}>
            <CardActionArea>
                {props.image && <CardMedia
                    className={classes.media}
                    image={apiURL.url + '/uploads/productImage/' + props.image}
                    title={props.title}

                />}
                <CardContent className={classes.contentText}>
                    <Typography className={classes.typography} gutterBottom variant="h5" component="h5">Название: {props.title}</Typography>
                    <Typography className={classes.typography}  gutterBottom variant="h5" component="h5">Кол-во: {props.amount}</Typography>
                    <Typography className={classes.typography}  gutterBottom variant="h5" component="h5">Тип: {props.productType}</Typography>
                    <Typography className={classes.typography}  gutterBottom variant="h5" component="h5">Цена: {props.price}</Typography>
                    <Typography className={classes.typography}  gutterBottom variant="h5" component="h5">Холодильник:
                        {props.isRefrigeratorRequired ?
                            wordList[language].necessarily :
                            wordList[language].notNecessary
                        }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions  className={classes.cardAction}>
                <Box>
                {checkPermission('editProduct')
                && <Button xs={12} sm={12}  color="primary"
                           component={NavLink}
                           to={`/product/edit/${props.id}`}
                           id={props.edit}

                >
                    Редактировать
                </Button>}
                </Box>
                <Box>
                {checkPermission('getStatistic')
                && <Button xs={12} sm={12}  color="primary"
                           component={NavLink}
                           to={`/product/stat/${props.id}`}

                >
                    Смотреть статистику
                </Button>}
                    </Box>
            </CardActions>
        </Card>
</Grid>
    );
}
export default ProductCard;