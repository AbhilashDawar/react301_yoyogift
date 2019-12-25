import React from 'react';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import Rating from '@material-ui/lab/Rating';
import { makeStyles, Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        // maxWidth: 300,
        height: 100,
        margin: '1%',
        border: 'solid 1px black'
    },
    sections: {
        height: '100%',
    },
    reviewText: {
        fontSize: '12px',
    },
    userName: {
        textTransform: 'capitalize'
    },
});

export default function ReviewCard(props) {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.card}>
                <Grid container className={classes.sections} justify="center" alignItems="center" alignContent="center">
                    <Grid item xs={5}>
                        <Grid item xs={12}>
                            <AccountCircleTwoToneIcon fontSize="large" />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="body1" component="p" className={classes.userName}>
                                {props.review.userName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                        <Grid container className={classes.sections} justify="center" alignItems="center" alignContent="center">
                            <Grid item xs={12}>
                                <Rating value={props.review.rating} readOnly />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="body1" component="p" className={classes.reviewText}>
                                    {props.review.review}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}