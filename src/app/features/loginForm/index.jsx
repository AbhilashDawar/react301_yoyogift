import React from 'react';
import { Paper, makeStyles, Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import GoogleLogin from 'react-google-login';
import { withRouter } from 'react-router-dom';

import AppButton from '../../shared/atoms/button';
import AppInput from '../../shared/atoms/input';
import http from '../../shared/utilities/http';

const loginFormSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Name should be more than 2 characters.')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Message should be atleast 2 characters.')
        .required('Required'),
});

function LoginForm({ history }) {
    const classes = useStyles();

    function afterLogin(res) {
        sessionStorage.setItem('TOKEN', JSON.stringify(res.accessToken));
        sessionStorage.setItem('PROFILE', JSON.stringify(res.profileObj));
        sessionStorage.setItem('ADMIN', false);
        http.GET(`/users?email=${res.profileObj.email}`).then((response) => {
            if (response.data.length > 0) {
                sessionStorage.setItem('USER', JSON.stringify(response.data[0]));
                if (response.data[0].isAdmin) {
                    sessionStorage.setItem('ADMIN', true);
                    history.push('/admin');
                } else {
                    history.push('/');
                }
            } else {
                const payload = {
                    name: res.profileObj.name,
                    email: res.profileObj.email,
                    balancePoints: 10000000,
                    isAdmin: false,
                    favorites: [],
                    image: res.profileObj.imageUrl,
                };
                http.POST('/users', payload).then(() => {
                    http.GET(`/users?email=${payload.email}`).then((res) => {
                        sessionStorage.setItem('USER', JSON.stringify(res.data[0]));
                        history.push('/');
                    })
                })
            }
        })
    }

    return (
        <div className={classes.container}>
            <div className={classes.loginContainer}>
                <Paper className={classes.paper}>
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        validationSchema={loginFormSchema}
                        onSubmit={values => {
                            console.log(values);
                        }}
                        onReset={() => { }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, handleReset }) => (
                            <Form className={classes.form} onSubmit={handleSubmit}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <AppInput
                                            fullWidth
                                            name="username"
                                            value={values.username}
                                            placeholder="Username"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.username && touched.username}
                                            helperText={errors.username && touched.username ? errors.username : null}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AppInput
                                            fullWidth
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.password && touched.password}
                                            helperText={errors.password && touched.password ? errors.password : null}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4} justify="flex-end" alignItems="flex-end">
                                    <Grid item xs={6}>
                                        <AppButton
                                            fullWidth
                                            type="submit"
                                            color="primary"
                                            content="Submit"
                                            disabled={isSubmitting}
                                        />
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Paper>
                <div className={classes.buttonsDiv}>
                    <GoogleLogin
                        clientId="885544194578-nbvmt6qbt257i6u4qom2ncl5nderldpq.apps.googleusercontent.com"
                        buttonText="Log in with Google"
                        onSuccess={afterLogin}
                        onFailure={afterLogin}
                        fetchBasicProfile='true'
                    />
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        height: '75vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    paper: {
        padding: '20px',
        overflow: 'auto'
    },
    loginContainer: {
        minWidth: '320px',
        maxWidth: '400px',
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: '0',
        right: '0',
        margin: 'auto'
    },
    buttonsDiv: {
        textAlign: 'center',
        padding: '10px'
    },
    form: {
        width: '100%',
    },
    customGPlusSignIn: {
        display: 'inline-block',
        background: 'white',
        color: '#444',
        width: '190px',
        borderRadius: '5px',
        border: 'thin solid #888',
        boxShadow: '1px 1px 1px grey',
        whiteSpace: 'nowrap',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    icon: {
        background: `url('/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat`,
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '42px',
        height: '42px',
    },
    buttonText: {
        display: 'inline-block',
        verticalAlign: 'middle',
        paddingLeft: '42px',
        paddingRight: '42px',
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: `'Roboto', sans-serif`,
    },
})

export default withRouter(LoginForm);