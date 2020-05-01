import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";

const AccessDenied = () => {
  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        <Typography variant='h3'>
          У вас нет прав доступа к этой странице
        </Typography>
      </Grid>
      <Grid item>
        <NavLink to='/'>{'Вернутся домой <<<'}</NavLink>
      </Grid>
    </Grid>
  );
};

export default AccessDenied;