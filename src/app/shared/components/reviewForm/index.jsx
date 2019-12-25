import React from 'react';
import { Formik, Form } from 'formik';
import Rating from '@material-ui/lab/Rating';
import {
    makeStyles, Grid, Typography
} from '@material-ui/core';

import AppInput from '../../atoms/input';
import AppButton from '../../atoms/button';
import http from '../../utilities/http';
import { reviewFormSchema } from '../../utilities/validationSchemas';

const useStyle = makeStyles({
    form: {
        width: '100%',
    },
    container: {
        width: '100%',
        height: '100%',
    }
});

export default function ReviewForm(props) {
    const classes = useStyle();

    return (
        <Grid container justify="center" alignItems="center" alignContent="center" className={classes.container}>
            <Grid container justify="center" alignItems="flex-start" alignContent="flex-start">
                <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="h5" align="center">
                        <span>Review the product</span>
                    </Typography>
                </Grid>
            </Grid>
            <Formik
                initialValues={{
                    rating: 0,
                    comment: '',
                }}
                validationSchema={reviewFormSchema}
                onSubmit={values => {
                    console.log(values);
                    const userData = JSON.parse(sessionStorage.getItem('USER'));
                    const user = {
                        id: userData.id,
                        name: userData.name,
                        email: userData.email,
                    };
                    const payload = {
                        userId: user.id,
                        userName: user.name,
                        giftId: props.giftId,
                        rating: values.rating,
                        review: values.comment,
                        reviewedAt: new Date()
                    };
                    http.POST('/comments-review', payload).then((res) => {
                        console.log('Review Successfully posted to DB');
                        props.reviewPosted();
                    }).catch((error) => {
                        console.log('Error posting Review to DB');
                    });
                    props.closePopUp(false);
                }}
                onReset={() => {
                    props.closePopUp(false);
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, handleReset, setFieldValue, isValid }) => (
                    <Form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Rating
                                    name="rating"
                                    value={values.rating}
                                    onChange={(event, value) => {
                                        setFieldValue('rating', value);
                                    }}
                                    onBlur={handleBlur}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <AppInput
                                name="comment"
                                multiline
                                fullWidth
                                rows={3}
                                placeholder="Please add your comments here."
                                value={values.comment}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.comment && touched.comment}
                                helperText={errors.comment && touched.comment ? errors.comment : null}
                            />
                        </Grid>
                        <Grid container spacing={4} justify="flex-end" alignItems="flex-end">
                            <Grid item xs={6}>
                                <AppButton
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    content="Submit"
                                    disabled={!isValid}
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
