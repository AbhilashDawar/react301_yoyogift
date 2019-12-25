import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Grid } from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import RateReviewIcon from '@material-ui/icons/RateReview';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import { teal, purple, yellow, brown } from '@material-ui/core/colors';

import AppFooter from '../../shared/components/footer';
import InfoBox from '../../shared/components/infoBox';
import http from '../../shared/utilities/http';

export default function AdminDashboard() {
    const classes = useStyles();
    const [state, setState] = useState({
        gifts: 0,
        reviews: 0,
        giftsSent: 0,
        users: 0,
    })

    useEffect(() => {
        http.GET('/db').then((response) => {
            setState({
                gifts: response.data.gifts.length,
                reviews: response.data['comments-review'].length,
                giftsSent: response.data['user-gifts'].length,
                users: response.data.users.length,
            })
        })
    }, [])

    return (
        <React.Fragment>
            <Paper className={classes.adminContainer}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <InfoBox
                            Icon={CardGiftcardIcon}
                            colorit={teal.A700}
                            title="Gift Coupons Available"
                            value={state.gifts}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoBox
                            Icon={CardGiftcardIcon}
                            colorit={yellow[500]}
                            title="Gift Coupons Sent"
                            value={state.giftsSent}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoBox
                            Icon={AssignmentIndIcon}
                            colorit={purple[600]}
                            title="Registered Users"
                            value={state.users}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InfoBox
                            Icon={RateReviewIcon}
                            colorit={brown[600]}
                            title="Total Reviews Given"
                            value={state.reviews}
                        />
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