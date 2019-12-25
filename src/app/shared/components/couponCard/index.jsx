import React from 'react';
import {
    Card, CardActionArea, CardContent, CardMedia, Typography, makeStyles
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

function CouponCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => { props.history.push(`/couponDetails/${props.gift.id}`) }}>
                <CardMedia
                    className={classes.media}
                    image={props.gift.imageUrl}
                />
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h6" component="h6" className={classes.description}>
                        <span>{props.gift.name}</span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className={classes.description}>
                        {props.gift.desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const useStyles = makeStyles({
    card: {
        maxHeight: 300,
        margin: '2%',
    },
    media: {
        height: 200,
    },
    description: {
        whiteSpace: 'nowrap',
        overflow: 'hidden!important',
        textOverflow: 'ellipsis',
    },
});

export default withRouter(CouponCard);