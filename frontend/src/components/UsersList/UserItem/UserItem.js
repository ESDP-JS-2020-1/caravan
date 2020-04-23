import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const UserItem = (
    {displayName, number, role}
) => {
    return (
        <ListItem button>
            <Grid container alignItems='center'>
                <Grid item xs={1}>
                    <Typography variant='h6'>
                        {number}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>
                        {displayName}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Chip label={role} />
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default UserItem;