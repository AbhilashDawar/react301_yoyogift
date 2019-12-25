import React from 'react';
import { Formik, Form } from 'formik';
import {
    makeStyles, Grid, Typography
} from '@material-ui/core';

import AppInput from '../../atoms/input';
import AppButton from '../../atoms/button';
import sendEmail from '../../utilities/emailjs';
import http from '../../utilities/http';
import { sendGiftSchema } from '../../utilities/validationSchemas';

const useStyle = makeStyles({
    form: {
        width: '100%',
    },
    container: {
        width: '100%',
        height: '100%',
    }
});

export default function SendGiftForm(props) {
    const classes = useStyle();

    return (
        <Grid container justify="center" alignItems="center" alignContent="center" className={classes.container}>
            <Grid container justify="center" alignItems="flex-start" alignContent="flex-start">
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="h5" align="center">
                        <span>Send Gift</span>
                    </Typography>
                </Grid>
            </Grid>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    personalMessage: '',
                }}
                validationSchema={sendGiftSchema}
                onSubmit={values => {
                    console.log(values);
                    const receiver = {
                        name: values.name,
                        email: values.email
                    };
                    const userData = JSON.parse(sessionStorage.getItem('USER'));
                    const sender = {
                        id: userData.id,
                        name: userData.name,
                        email: userData.email,
                    };
                    const link = `http://localhost:3000/couponDetails/${props.giftId}`;
                    const message = values.personalMessage;
                    sendEmail(receiver, sender, message, link);
                    const payload = {
                        senderId: sender.id,
                        senderEmail: sender.email,
                        receiverEmail: receiver.email,
                        giftId: props.giftId,
                        giftName: props.giftName
                    };
                    http.POST('/user-gifts', payload).then((res) => {
                        console.log('Successfully posted to DB');
                    }).catch((error) => {
                        console.log('Error posting to DB');
                    })
                    props.closePopUp(false);
                }}
                onReset={() => {
                    props.closePopUp(false);
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, handleReset }) => (
                    <Form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <AppInput
                                    fullWidth
                                    name="name"
                                    value={values.name}
                                    placeholder="Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.name && touched.name}
                                    helperText={errors.name && touched.name ? errors.name : null}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <AppInput
                                    fullWidth
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.email && touched.email}
                                    helperText={errors.email && touched.email ? errors.email : null}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <AppInput
                                name="personalMessage"
                                multiline
                                fullWidth
                                rows={3}
                                placeholder="Message"
                                value={values.personalMessage}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.personalMessage && touched.personalMessage}
                                helperText={errors.personalMessage && touched.personalMessage ? errors.personalMessage : null}
                            />
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
                            <Grid item xs={6}>
                                <AppButton
                                    fullWidth
                                    type="button"
                                    color="secondary"
                                    content="Cancel"
                                    onClick={handleReset}
                                    disabled={isSubmitting}
                                />
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Grid >
    );
}
