import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import {NavLink} from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import {wordList} from "../../../wordList";
import moment from "moment";
import TableRow from "@material-ui/core/TableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSelector} from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles({
    title: {
        width: '60%',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    root: {
        display: "flex",
        flexDirection: 'column',
        minWidth: 275,
        height: '100%',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    cardTitle: {
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: '0 auto',
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    chipBlock: {
        width: '100%',
        padding: '5px',
        margin: 'auto 0 0 0'
    },
    chip: {
        width: '98%'
    }
});

const HistoriesListItem = (
    {info, schemaNameInPlural, history}
) => {
    const classes = useStyles();

    const language = useSelector(state => state.language.name);

    const determineType = (type) => {
        switch (type) {
            case 'edit':
                return (wordList[language].histories.editType);
            case 'delete':
                return (wordList[language].histories.deleteType);
            case 'add':
                return (wordList[language].histories.addType);
            default:
                return 'Not found';
        }
    };

    const determineInfo = (info) => {
        if (info.displayName) return  info.displayName;
        if (info.name) return  info.name;
        if (info.status) return  'заявку';
    };

    let text = '';
    let chipType = 'default';
    const userName = history.user.displayName;
    let operationType = determineType(history.type);
    let documentInfo = determineInfo(info);

    switch (history.type) {
        case 'delete':
            text = wordList[language].histories.deleteLabel;
            chipType = 'secondary';
            break;
        case 'add':
            text = wordList[language].histories.addLabel;
            chipType = 'primary';
            break;
        case 'edit':
            text = wordList[language].histories.editLabel;
            break;
        default:
            text = 'null';
    }

    return (
        <>
            <Hidden smDown>
                <TableRow key={history._id}>
                    <TableCell component="th" scope="row">
                        <div className={classes.title}>
                            <b>{userName}</b>
                            <p>{operationType}</p>
                            {history.type === 'delete' ?
                                <p>{documentInfo}</p> :
                                <NavLink exact
                                         to={info.productType ?
                                             `/?product=${info.name}`
                                             : `/${schemaNameInPlural}/${info._id}`
                                         }>{documentInfo}</NavLink>}
                        </div>
                    </TableCell>
                    <TableCell align="right">
                        <Chip
                            size="small"
                            label={text}
                            color={chipType}
                        />
                    </TableCell>
                    <TableCell
                        align="right">{moment(history.date).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                </TableRow>
            </Hidden>
            <Hidden mdUp>
                <Grid item xs>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                                <b style={{marginRight: '10px'}}>{userName}</b>
                                <span style={{marginRight: '10px'}}>{operationType}</span>
                                {history.type === 'delete' ?
                                    <span>{documentInfo}</span> :
                                    <NavLink exact
                                             to={info.productType ?
                                                 `/?product=${info.name}`
                                                 : `${schemaNameInPlural}/${info._id}`
                                             }>{documentInfo}</NavLink>}
                            </Typography>
                        </CardContent>
                        <div className={classes.chipBlock}>
                            <Chip
                                className={classes.chip}
                                size="small"
                                label={text}
                                color={chipType}
                            />
                        </div>
                    </Card>
                </Grid>
            </Hidden>
        </>
    );
};

export default HistoriesListItem;