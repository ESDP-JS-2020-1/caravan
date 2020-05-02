import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        marginBottom: '2%',
    },
    input: {
        display: 'none',
    },
    select: {
        width: '100%'
    }
}));
const FormElement = props => {
    const classes = useStyles();

    let field = <TextField
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
    />;

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