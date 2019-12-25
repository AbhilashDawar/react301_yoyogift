import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import {
    Menu, MenuItem, ListItemIcon, ListItemText, IconButton, withStyles
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function UserActions(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userLoggedIn, setStatus] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (sessionStorage.getItem('TOKEN')) {
            setStatus(true);
        }
        setImageUrl(JSON.parse(sessionStorage.getItem('PROFILE'))?.imageUrl);
    })

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        setStatus(false);
        sessionStorage.removeItem('TOKEN');
        sessionStorage.removeItem('PROFILE');
        sessionStorage.removeItem('ADMIN');
        props.history.push('/login');
        console.log('User logged out successfully');
    }

    const login = () => {
        props.history.push('/login');
        handleClose();
    }

    const menuId = 'primary-search-account-menu';

    return (
        <div>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                {userLoggedIn ? <img src={imageUrl} width="38px" /> : <AccountCircle />}
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {userLoggedIn ?
                    <StyledMenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LockOpenIcon fontSize="default" />
                        </ListItemIcon>
                        <GoogleLogout
                            clientId="885544194578-nbvmt6qbt257i6u4qom2ncl5nderldpq.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={logout}
                        >
                        </GoogleLogout>
                    </StyledMenuItem>
                    :
                    <StyledMenuItem onClick={login}>
                        <ListItemIcon>
                            <FaceIcon fontSize="default" />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </StyledMenuItem>
                }
            </StyledMenu>
        </div>
    );
}

export default withRouter(UserActions);