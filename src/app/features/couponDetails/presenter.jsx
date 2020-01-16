import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, Paper, Grid,
} from '@material-ui/core';

import http from '../../shared/utilities/http';
import AppButton from '../../shared/atoms/button';
import AppPopUp from '../../shared/atoms/popUp';
import SendGiftForm from '../../shared/components/sendGiftForm';
import ReviewCard from '../../shared/components/reviewCard';
import ReviewForm from '../../shared/components/reviewForm';

export default function CouponDetails() {

    const { couponID } = useParams();
    const classes = useStyles();
    const [cardDetails, setCardDetails] = useState(undefined);
    const [reviews, setReviews] = useState(undefined);
    const [showGiftPopUp, setShowGiftPopUp] = useState(false);
    const [showReviewPopUp, setShowReviewPopUp] = useState(false);

    function toggleGiftPopUp(value) {
        setShowGiftPopUp(value);
    }

    function toggleReviewPopUp(value) {
        setShowReviewPopUp(value);
    }

    function refreshReviews() {
        const id = couponID;
        http.GET(`/comments-review?giftId=${id}`).then((response) => {
            setReviews(response.data);
        }).catch(() => {
            console.log("ERROR while fetching comments-review")
        });
    }

    useEffect(() => {
        // 21-125-8104
        const id = couponID;
        http.GET(`/gifts?id=${id}`).then((response) => {
            setCardDetails(response.data[0]);
        }).catch(() => {
            console.log("ERROR while fetching gifts")
        });
        refreshReviews();
    }, [couponID])

    return (
        <React.Fragment>
            {cardDetails && reviews &&
                <React.Fragment>
                    <AppPopUp open={showReviewPopUp} closePopUp={toggleReviewPopUp}>
                        <ReviewForm closePopUp={toggleReviewPopUp} giftId={couponID} reviewPosted={refreshReviews}
                            {...{ cardDetails, reviews }} />
                    </AppPopUp>
                    <AppPopUp open={showGiftPopUp} closePopUp={toggleGiftPopUp}>
                        <SendGiftForm closePopUp={toggleGiftPopUp} giftId={couponID} giftName={cardDetails.name} />
                    </AppPopUp>
                    <Paper className={classes.page}>
                        <Grid container className={classes.upperDetails}>
                            <Grid item xs={5}>
                                <Paper className={classes.card}>
                                    <img
                                        className={classes.media}
                                        src={cardDetails.imageUrl}
                                        title={cardDetails.name}
                                        alt={cardDetails.name}
                                    />
                                </Paper>
                                <Paper className={classes.actionCenter}>
                                    <Grid container spacing={4} justify="space-evenly">
                                        <Grid item xs={5}>
                                            <AppButton
                                                fullWidth
                                                type="button"
                                                content="Give Review"
                                                className={classes.buttonReview}
                                                onClick={() => {
                                                    if (sessionStorage.getItem('PROFILE')) {
                                                        toggleReviewPopUp(true)
                                                    } else {
                                                        alert('Please login');
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <AppButton
                                                fullWidth
                                                type="button"
                                                color="primary"
                                                content="Send as Gift"
                                                onClick={() => {
                                                    if (sessionStorage.getItem('PROFILE')) {
                                                        toggleGiftPopUp(true);
                                                    } else {
                                                        alert('Please login');
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={7} className={classes.rightPanel}>
                                <Paper className={classes.item}>
                                    <Grid container className={classes.root}>
                                        <Grid item xs={12} className={classes.item}>
                                            <Typography gutterBottom variant="h5" component="h5" align="left">
                                                <span className={classes.title}>{cardDetails.name}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} className={classes.item}>
                                            <Grid container alignItems="center" justify="flex-start">
                                                <Typography gutterBottom variant="h4" component="span">
                                                    <span className={classes.sellingPrice}>₹{Math.round((cardDetails.buyoutPoints - ((cardDetails.discounts / 100) * cardDetails.buyoutPoints)) * 100) / 100}</span>
                                                </Typography>
                                                &nbsp;&nbsp;&nbsp;
                                            <Typography gutterBottom variant="subtitle1" component="span">
                                                    <span className={classes.actualPrice}>₹{cardDetails.buyoutPoints}</span>
                                                </Typography>
                                                &nbsp;&nbsp;&nbsp;
                                            <Typography gutterBottom variant="subtitle1" component="span">
                                                    <span className={classes.discount}>{cardDetails.discounts}% off</span>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className={classes.item}>
                                            <Typography gutterBottom variant="body2" component="p" align="left">
                                                Average Ratings: <Typography gutterBottom variant="h6" component="span">
                                                    <span>{cardDetails.rating}</span>
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} className={classes.item}>
                                        </Grid>
                                        <Grid item xs={12} className={classes.item}>
                                            <Typography gutterBottom variant="body2" component="p" align="left">
                                                {cardDetails.desc}
                                            </Typography>
                                        </Grid>
                                        <Grid container className={classes.upperDetails} justify="center">
                                            <Typography variant="h5" component="span" color="primary" className={classes.reviewsHeader}>
                                                <span>Reviews</span>
                                            </Typography>
                                        </Grid>
                                        <Grid container className={classes.upperDetails}>
                                            <Paper className={classes.reviewArea}>
                                                {reviews.length > 0 ?
                                                    <Grid item xs={12}>
                                                        <Grid container justify="center">
                                                            {reviews.map((item) => {
                                                                return <ReviewCard key={item.id} review={item} />
                                                            })}
                                                        </Grid>
                                                    </Grid>
                                                    : <Typography gutterBottom variant="subtitle1" component="span" align="center">
                                                        No Reviews Yet
                                                </Typography>
                                                }
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </React.Fragment>
            }
        </React.Fragment>
    )
}


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    upperDetails: {
        flexGrow: 1,
        maxHeight: '83vh',
    },
    page: {
        height: '83vh',
        // margin: '1%',
        marginTop: '2.5%',
        overflow: 'hidden',
    },
    card: {
        margin: '1%',
        height: '60vh',
    },
    media: {
        height: '100%',
        width: '100%',
        // borderRadius: '20px',
    },
    item: {
        margin: '1%',
    },
    title: {
        textTransform: 'capitalize',
    },
    actualPrice: {
        textDecoration: 'line-through',
        fontSize: '16px',
    },
    sellingPrice: {
        fontWeight: 'bold',
        fontSize: '30px',
    },
    reviewArea: {
        width: '100%',
        height: '100%',
        padding: '1%',
        // overflow: 'auto',
    },
    reviewsHeader: {
        marginTop: '2%',
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
    discount: {
        fontWeight: 'bold',
        color: 'green',
        fontSize: '20px',
    },
    rightPanel: {
        overflow: 'auto',
        height: '83vh'
    },
    buttonReview: {
        backgroundColor: '#ffb400',
    },
    actionCenter: {
        margin: '1%',
        padding: '1%'
    },
});