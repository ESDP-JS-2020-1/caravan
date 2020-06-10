import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import {addNewGroup, getPermissions} from "../../store/actions/groupActions";
import FormElement from "../../components/UI/Form/FormElement";
import {wordList} from "../../wordList";
import Alert from "@material-ui/lab/Alert";
import Spinner from "../../components/UI/Spinner/Spinner";

const useStyles = makeStyles({
    formBtn: {
        marginTop: '1%',
        display: 'block',
        textAlign: 'center',
    },
    formButton: {
        fontWeight: 'bold',
        width: '100%',
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
    },
    gridItem: {
        margin: '0 auto',
        marginTop: '5%'
    },
    formControlLabel: {
        marginLeft: '0px'
    },
    boxMapDisplay: {
        width: '100%',
        height: '410px'
    }
});

const AddGroup = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const language = useSelector(state => state.language.name);

    const error = useSelector(state => state.groups.error);

    const permissions = useSelector(state => state.groups.permissions);

    const [groupInfo, setGroupInfo] = useState({name: ''});
    const [checkboxes, setCheckboxes] = useState(undefined);

    const changeGroupInfo = e => setGroupInfo({...groupInfo, [e.target.name]: e.target.value});
    const changeCheckboxesInfo = e => setCheckboxes({...checkboxes, [e.target.name]: !checkboxes[e.target.name]});

    useEffect(() => {
        if (checkboxes === undefined && permissions === undefined) dispatch(getPermissions());

        if (permissions && checkboxes === undefined) {
            const perms = {};
            permissions.forEach(e => perms[e] = false);

            setCheckboxes(e => ({...perms}));
        }
    }, [dispatch, permissions, checkboxes]);

    const addGroup = e => {
        e.preventDefault();
        const info = {...groupInfo};
        info.permissions = {...checkboxes};
        dispatch(addNewGroup(info))
    };

    const loading = useSelector(state => state.loading.loading)
    if (loading) {
        return <Spinner/>
    }

    return (
        <Container>
            <Grid className={classes.gridItem} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            {wordList[language].addGroup.addGroupTitle}
                        </Typography>
                    </Box>
                    <form onSubmit={addGroup}>
                        <Grid container direction='column' spacing={1}>
                            <Grid item>
                                <FormElement
                                    id='groupName'
                                    required
                                    propertyName='name'
                                    title={wordList[language].addGroup.addGroupName}
                                    value={groupInfo.name}
                                    onChange={changeGroupInfo}
                                />
                            </Grid>
                            {checkboxes !== undefined && permissions.map((elem, id) => (
                                <FormElement
                                    key={id}
                                    type='checkbox'
                                    propertyName={elem}
                                    title={elem}
                                    value={checkboxes[elem]}
                                    onChange={(e) => changeCheckboxesInfo(e)}
                                />
                            ))}
                            {!!error && <Grid item>
                                <Alert severity="error">
                                    {error}
                                </Alert>
                            </Grid>}
                            <Grid item>
                                <Box className={classes.formBtn} component="span">
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                    >
                                        {wordList[language].addGroup.addGroupBtn}
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

export default AddGroup;