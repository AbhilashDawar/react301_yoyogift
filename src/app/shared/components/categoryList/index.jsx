import React, { useEffect, useState } from 'react';
import {
    Grid, makeStyles, Paper, Typography
} from '@material-ui/core';
import http from '../../utilities/http';
import { withRouter } from 'react-router-dom';

function CategoryList(props) {
    const classes = useStyles();
    const [categories, setCategories] = useState(undefined);

    useEffect(() => {
        http.GET(`/category`).then((response) => {
            setCategories(response.data);
        }).catch(() => {
            console.log("ERROR while fetching categories")
        });
    }, [])

    return (
        <Paper className={classes.categoryPanel}>
            <Grid container justify="center" alignContent="flex-end" alignItems="flex-end" spacing={6} >
                <Grid item><Typography className={classes.bold}>Categories:</Typography></Grid>
                {categories &&
                    categories.map((item) => {
                        return <Grid item
                            className={classes.category}
                            key={item.id}
                            onClick={() => { props.history.push(`/categoryView/${item.id}`) }}
                        >
                            <Typography>{item.name}</Typography>
                        </Grid>
                    })
                }
            </Grid>
        </Paper>
    )
}

const useStyles = makeStyles({
    category: {
        "&:hover": {
            cursor: 'pointer',
            color: 'gold'
        }
    },
    categoryPanel: {
        width: '100%',
        marginTop: '2%',
    },
    bold: {
        fontWeight: 'bold'
    }
});

export default withRouter(CategoryList);