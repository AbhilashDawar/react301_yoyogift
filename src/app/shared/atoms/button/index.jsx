import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function AppButton(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button variant="contained" {...props}>
                {props.content}
            </Button>
        </div>
    );
}

export default AppButton;
