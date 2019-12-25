import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function AppInput(props) {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <TextField
                    rowsMax={props.rowsMax ? props.rowsMax : 4}
                    {...props}
                />
            </Grid>
        </Grid>
    );
}

export default AppInput;
