import React, {useEffect, useState} from 'react';
import {editGroup, getGroup} from "../../store/actions/groupActions";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
    const initialCheckboxes = {
        addUser: false,
        deleteUser: false,
        editUser: false,
        addProduct: false,
        deleteProduct: false,
        editProduct: false,
        getGroup: false,
        addGroup: false,
        deleteGroup: false,
        addRequest: false,
        editGroup: false,
        deleteRequest: false,
        editRequest: false,
        viewHistory: false
    };

    const dispatch = useDispatch();
    const group = useSelector(state => state.groups.group);

    const [groupInfo, setGroupInfo] = useState({name: ''});
    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);


    const changeGroupInfo = e => setGroupInfo({...groupInfo, [e.target.name]: e.target.value});
    const changeCheckboxesInfo = e => setCheckboxes({...checkboxes, [e.target.name]: !checkboxes[e.target.name]});


    useEffect(() => {

        if(group.permissions ) {
            const groupPermissions = [...group.permissions];
            const permissions = {
                addUser: false,
                deleteUser: false,
                editUser: false,
                addProduct: false,
                deleteProduct: false,
                editProduct: false,
                getGroup: false,
                addGroup: false,
                deleteGroup: false,
                addRequest: false,
                editGroup: false,
                deleteRequest: false,
                editRequest: false,
                viewHistory: false
            };

            Object.keys(permissions).forEach(elem => {
                if( elem === groupPermissions.find(element => element === elem)){
                    permissions[elem] = true
                }
            });
            setGroupInfo(name => ({name: group.name}));
            setCheckboxes(elem => ({...permissions}));
        } else if(group.permissions === undefined) {
            dispatch(getGroup(props.match.params.id));
        }
    }, [dispatch, props.match.params.id, group.permissions, group.name]);

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
                                title='Название'
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
                            >Редактировать</Button>
                        </Grid>
                    </Grid>
                    {Object.keys(initialCheckboxes).map((elem, id) => (
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