import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginBottom: '2%',
  },
}));
const FormElement = props => {
  const classes = useStyles();
    return (
        <TextField
            className={classes.root}
            label={props.title}
            variant="filled"
            error={!!props.error}
            type={props.type}
            name={props.propertyName} id={props.propertyName}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}
        />
    );
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    autoComplete: PropTypes.string
};

export default FormElement;