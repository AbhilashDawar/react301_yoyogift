import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Container,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    LinearProgress,
} from '@material-ui/core';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import UserActions from '../../../features/userActions';
import config from '../../../../config.js';
import { ContextState } from '../../../shared/utilities/context/state';

function AppHeader(props) {
    const classes = useStyles();
    let { state } = useContext(ContextState);

    return (
        <React.Fragment>
            <AppBar position="sticky">
                <Container>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap onClick={() => { props.history.push('/') }}>
                            {config.appName}
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.grow} />
                        <IconButton
                            edge="end"
                            onClick={props.changeTheme}
                            color="inherit"
                        >
                            {props.darkMode ? <Brightness4OutlinedIcon /> : <Brightness4Icon />}
                        </IconButton>
                        <UserActions />
                    </Toolbar>
                </Container>
                {state.showLoader ? <LinearProgress color="secondary" /> : <span></span>}
            </AppBar>
        </React.Fragment>
    );
}

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        '&:hover': {
            cursor: 'pointer',
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default withRouter(AppHeader);