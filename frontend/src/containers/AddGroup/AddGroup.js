import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {addNewGroup} from "../../store/actions/groupActions";

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

    const [groupInfo, setGroupInfo] = useState({name: ''});

    const changeGroupInfo = e => setGroupInfo({...groupInfo, [e.target.name]: e.target.value});

    const addGroup = e => {
        e.preventDefault();

        dispatch(addNewGroup(groupInfo))
    };

    return (
        <Container>
            <Grid className={classes.gridItem} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Box className={classes.typography} component={'span'}>
                        <Typography className={classes.typographyText} variant="h6" gutterBottom>
                            Добавление новую группу
                        </Typography>
                    </Box>
                    <form onSubmit={addGroup}>
                        <Grid container direction='column' spacing={1}>
                            <Grid item>
                                <FormElement
                                    id='groupName'
                                    required
                                    propertyName='name'
                                    title='Название группы'
                                    value={groupInfo.name}
                                    onChange={changeGroupInfo}
                                />
                            </Grid>
                            <Grid item>
                                <Box className={classes.formBtn} component="span">
                                    <Button
                                        className={classes.formButton}
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                    >
                                        Добавить
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