import React, {useEffect, useState} from 'react';
import {editGroup, getGroup, getPermissions} from "../../store/actions/groupActions";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {wordList} from "../../wordList";

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

const EditGroup = props => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const group = useSelector(state => state.groups.group);
    const language = useSelector(state => state.language.name);

    const permissions = useSelector(state => state.groups.permissions);

    const [groupInfo, setGroupInfo] = useState({name: ''});
    const [checkboxes, setCheckboxes] = useState(null);


    const changeGroupInfo = e => setGroupInfo({...groupInfo, [e.target.name]: e.target.value});
    const changeCheckboxesInfo = e => setCheckboxes({...checkboxes, [e.target.name]: !checkboxes[e.target.name]});


    useEffect(() => {

        if(group.permissions === undefined) {
            dispatch(getGroup(props.match.params.id));
            if(permissions === undefined) dispatch(getPermissions())
        }

        if(group.permissions && permissions) {
            const groupPermissions = [...group.permissions];

            permissions.forEach(elem => {
                if( elem === groupPermissions.find(element => element === elem)){
                    permissions[elem] = true
                } else {
                    permissions[elem] = false
                }
            });
            setGroupInfo(name => ({name: group.name}));
            setCheckboxes(elem => ({...permissions}));
        }
    }, [dispatch, props.match.params.id, group, permissions]);

    return (
        <Container>
            <Grid className={classes.gridItem} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5}>
                    <Grid container >
                        <Grid item xs={9}>
                            <FormElement
                                id='groupName'
                                required
                                propertyName='name'
                                title={wordList[language].editGroup.title}
                                value={groupInfo.name}
                                onChange={changeGroupInfo}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                style={{height: '55px'}}
                                variant='contained'
                                color='primary'
                                onClick={() => dispatch(editGroup({name: groupInfo, permissions: checkboxes}, props.match.params.id))}
                            >{wordList[language].editGroup.btn}</Button>
                        </Grid>
                    </Grid>
                    {checkboxes && permissions && permissions.map((elem, id) => (
                        <FormElement
                            key={id}
                            type='checkbox'
                            propertyName={elem}
                            title={elem}
                            value={checkboxes[elem]}
                            onChange={(e) => changeCheckboxesInfo(e)}
                        />
                    ))}
                </Box>
            </Grid>
        </Container>
    );
};

export default EditGroup;