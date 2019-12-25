import React, { useEffect, useState, useContext } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Grid, WindowScroller, AutoSizer } from 'react-virtualized';
import { makeStyles, Paper } from '@material-ui/core';

import AppFilter from '../../shared/components/filter';
import CouponCard from '../../shared/components/couponCard';
import { ContextState } from '../../shared/utilities/context/state';
import http from '../../shared/utilities/http';
import config from '../../../config';

function CategoryView(props) {
    const classes = useStyles();
    const { categoryId } = useParams();
    const [gifts, setGifts] = useState(undefined);
    let { dispatch } = useContext(ContextState);

    useEffect(() => {
        dispatch({ type: 'SHOW' });
        let searchParams = {};
        let url = `/gifts?categoryId=${categoryId}`;
        if (props.location.search) {
            props.location.search.split('?')[1].split('&').forEach((param) => {
                let query = param.split('=');
                searchParams[query[0]] = parseInt(query[1]);
            });
            if (searchParams.startValue !== config.rangeDefaults.min
                || searchParams.endValue !== config.rangeDefaults.max
                || searchParams.discountOption !== 0) {
                url = `/gifts?categoryId=${categoryId}&buyoutPoints_gte=${searchParams.startValue}&buyoutPoints_lte=${searchParams.endValue}&discounts_gte=${searchParams.discount}`;
            }
        }
        http.GET(url + '&_limit=500').then((response) => {
            const data = [];
            for (let i = 0; i < response.data.length; i += 3) {
                data.push([response.data[i], response.data[i + 1], response.data[i + 2]]);
            }
            setGifts(data);
            dispatch({ type: 'HIDE' });
        })
    }, [categoryId, props.location.search])

    function renderCouponCard({ columnIndex, key, rowIndex, style, isScrolling }) {
        const gift = gifts[rowIndex][columnIndex];
        const content = isScrolling ? <span>...</span> : gift ? <CouponCard gift={gift}></CouponCard> : <></>;
        return (
            <div key={key} style={style} className={classes.row}>
                {content}
            </div>
        );
    }

    return (
        <React.Fragment>
            <AppFilter />
            <Paper className={classes.div}>
                {gifts && gifts.length > 0 ?
                    <WindowScroller >
                        {({ height }) => (
                            <AutoSizer>
                                {({ width }) => (
                                    <Grid
                                        height={height - 250}
                                        width={width}
                                        cellRenderer={renderCouponCard}
                                        columnWidth={399}
                                        columnCount={gifts[0].length}
                                        overscanRowCount={10}
                                        rowHeight={300}
                                        rowCount={gifts.length}
                                    />
                                )}
                            </AutoSizer>
                        )}
                    </WindowScroller>
                    : <span>No Records Found!</span>
                }
                {/* <Grid container spacing={4}>
                {gifts.map((gift, index) => {
                    if (index < 25)
                        return (<CouponCard key={gift.id} gift={gift}></CouponCard>);
                })}
            </Grid> */}
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
        height: '75vh',
        width: '100%',
        marginTop: '1%',
        paddingTop: '1%',
    }
});

export default withRouter(CategoryView);