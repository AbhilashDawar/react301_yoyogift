import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import {
    makeStyles, Typography, Grid, Paper
} from '@material-ui/core';

import http from '../../shared/utilities/http';
import CouponCard from '../../shared/components/couponCard';
import { ContextState } from '../../shared/utilities/context/state';

function HomeComponent() {
    const classes = useStyles();
    const [gifts, setGifts] = useState([]);
    const { dispatch } = useContext(ContextState);

    useEffect(() => {
        dispatch({ type: 'SHOW' });
        let url = `/gifts?_sort=rating&_order=desc&_limit=6`;
        http.GET(url).then((response) => {
            const data = [];
            for (let i = 0; i < response.data.length; i += 3) {
                data.push([response.data[i], response.data[i + 1], response.data[i + 2]]);
            }
            setGifts(data);
            dispatch({ type: 'HIDE' });
        })
    }, [])

    function RenderTopGifts() {
        return (
            <Grid container>
                {gifts.map((row, index) => {
                    return (
                        <Grid container key={`container${index}`} spacing={2} justify="space-evenly">
                            {row.map((gift) => {
                                return (
                                    <Grid item key={gift.id} xs={4}>
                                        <CouponCard gift={gift}></CouponCard>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    )
                })}
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Paper className={classes.div}>
                {gifts.length > 0 &&
                    <Grid container >
                        <Grid item xs={12}>
                            <Typography variant="h6" component="span" color="primary" className={classes.title}>
                                <span>Top Coupons</span>
                            </Typography>
                        </Grid>
                        {<RenderTopGifts />}
                    </Grid>
                }
            </Paper>
        </React.Fragment>
    )
}

const useStyles = makeStyles({
    row: {
        marginBottom: '1%',
        marginTop: '1%',
    },
    div: {
        marginTop: '2.5%',
        padding: '2%',
    },
    title: {
        marginBottom: '2%',
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
});

export default withRouter(HomeComponent);