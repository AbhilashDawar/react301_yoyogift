import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container, Grid
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import config from '../../../../config.js';

export default function AppFooter() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container>
                <Grid container justify="center" className={classes.footerMain}>
                    <Grid item xs={12} sm={3}>
                        <Grid container className={classes.footerDetails}>
                            <span>{config.appName}</span>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container>
                            <Grid item xs={6} className={classes.footerDetails}>
                                <span>YoYoGift Technologies Pvt. Ltd.</span><br />
                                <span>Global Village Tech Park,</span><br />
                                <span>RR Nagar, Bengaluru 560059</span><br />
                                <span>Karnakata, INDIA</span>
                            </Grid>
                            <Grid item xs={6} className={classes.footerDetails}>
                                <span>+91-42444 42444</span>
                                <br />
                                <br />
                                <span>info@yoyogift.in</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Grid container justify="flex-end" alignItems="center">
                            <Grid item >
                                <Grid container justify="space-evenly" alignItems="center" spacing={2}>
                                    <Grid item>
                                        <LinkedInIcon fontSize="large" />
                                    </Grid>
                                    <Grid item >
                                        <InstagramIcon fontSize="large" />
                                    </Grid>
                                    <Grid item >
                                        <FacebookIcon fontSize="large" />
                                    </Grid>
                                    <Grid item >
                                        <TwitterIcon fontSize="large" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className={classes.footerReservedText} justify="flex-start" alignItems="center">
                    <span>&copy;2019 All Rights Reserved</span>
                </Grid>
            </Container>
        </footer>
    );
}

const useStyles = makeStyles(theme => ({
    footer: {
        minHeight: '100px',
        color: 'white',
        backgroundColor: '#333333',
        position: 'fixed',
        marginTop: '1%',
        left: '0',
        bottom: '0',
        width: '100%',
    },
    footerMain: {
        padding: '2%',
    },
    companyName: {
        fontSize: '20px',
    },
    footerDetails: {
        fontSize: '14px',
        lineHeight: '1.4',
        textAlign: 'left',
    },
    footerReservedText: {
        fontSize: '14px',
        height: '10%',
        color: 'grey',
    },
}));