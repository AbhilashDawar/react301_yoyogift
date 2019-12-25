import React from 'react';
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

function InfoBox(props) {
    const useStyles = makeStyles(theme => ({
        paper: {
            height: '150px',
            borderRadius: '25px',
            margin: '2%'
        },
        container: {
            height: '100%',
            borderRadius: '25px',
        },
        fullContainer: {
            height: '100%',
            width: '100%',
        },
        content: {
            padding: '5px 10px',
            height: '100%'
        },
        number: {
            display: 'block',
            fontWeight: theme.typography.fontWeightBold,
            color: grey[600]
        },
        text: {
            fontWeight: theme.typography.fontWeightMedium,
            color: grey[600]
        },
        iconSpan: {
            float: 'left',
            height: '100%',
            textAlign: 'center',
            backgroundColor: props.colorit,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '25px 0px 0px 25px'
        },
        icon: {
            width: 60,
            height: 75,
            maxWidth: '100%',
        },
    }));
    const Icon = props.Icon;
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container className={classes.container}>
                <Grid item xs={4} className={classes.iconSpan}>
                    <Icon className={classes.icon} />
                </Grid>

                <Grid item xs={6} className={classes.content}>
                    <Grid container className={classes.fullContainer} spacing={2} justify="center" alignItems="center" alignContent="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.text}>{props.title}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" className={classes.number}>{props.value}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default InfoBox;
