import React from 'react';
import { makeStyles, Paper, Grid, Typography } from '@material-ui/core';
import AppFooter from '../../shared/components/footer';

export default function NotFound() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Paper className={classes.adminContainer}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>Page Not Found</Typography>
                    </Grid>
                </Grid>
            </Paper>
            <AppFooter />
        </React.Fragment>
    )
}

const useStyles = makeStyles({
    adminContainer: {
        margin: '1%',
        marginTop: '2.5%',
    },
});