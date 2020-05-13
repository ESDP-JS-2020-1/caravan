import React from 'react';

import PropTypes from 'prop-types';

import {fade, makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: '2%',
    },
    input: {
        display: 'none',
    },
    select: {
        width: '100%'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        }
    }
}));

const FormElement = props => {
    const classes = useStyles();

    let field = <TextField
        disabled={props.disabled}
        className={classes.root}
        label={props.title}
        variant="outlined"
        error={!!props.error}
        type={props.type}
        name={props.propertyName}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        autoComplete={props.autoComplete}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
    />;

    if (props.type === 'search') {
        field = <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder={props.title}
                value={props.value}
                onChange={props.onChange}
                name={props.propertyName}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    }

    if (props.type === 'checkbox') {
        field = (
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Checkbox
                    checked={props.value}
                    onChange={props.onChange}
                    name={props.propertyName}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Typography variant='h6'>
                    {props.title}
                </Typography>
            </div>
        )
    }

    if (props.type === 'file') {
        field = (
            <>
                <input
                    accept="image/*"
                    className={classes.input}
                    id={"contained-button-file-"+props.index}
                    multiple
                    type="file"
                    name={props.propertyName}
                    onChange={props.onChange}
                />
                <label htmlFor={"contained-button-file-"+props.index}>
                    <div>
                        <Button variant="outlined" color="primary" component="span" startIcon={<PhotoCameraIcon/>}>
                            {props.title}
                        </Button>
                        {props.value && <Typography variant='h6' display='inline'>
                            {props.value.name}
                        </Typography>}
                    </div>
                </label>
            </>
        )
    }

    if (props.type === 'select') {
        field = (
            <FormControl variant="filled" className={classes.select}>
                <InputLabel htmlFor="role">{props.title}</InputLabel>
                <Select
                    id='role'
                    variant="outlined"
                    value={props.value}
                    onChange={props.onChange}
                    name={props.propertyName}
                    label={props.title}
                    fullWidth
                >
                    {props.options.map(option => (
                        <MenuItem id={option+'Option'} value={option} key={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }

    return field;
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    autoComplete: PropTypes.string
};

export default FormElement;