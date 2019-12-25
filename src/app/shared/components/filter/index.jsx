import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Grid, Slider, Paper, Typography, Radio, RadioGroup, FormControlLabel, FormControl, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Formik, Form } from 'formik';

import AppButton from '../../atoms/button';
import AppInput from '../../atoms/input';
import config from '../../../../config.js';
import './filter.scss';

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 100000,
        label: '100000',
    },
];

function AirbnbThumbComponent(props) {
    return (
        <span {...props}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
        </span>
    );
}

function AppFilter(props) {
    const classes = useStyle();
    let [setup, updateSetup] = useState(false);
    let [_initialValues, setInitialValues] = useState({
        range: [config.rangeDefaults.min, config.rangeDefaults.max],
        startValue: config.rangeDefaults.min,
        endValue: config.rangeDefaults.max,
        discountOption: '0'
    });

    useEffect(() => {
        let searchParams = {};
        if (props.location.search) {
            props.location.search.split('?')[1].split('&').forEach((param) => {
                let query = param.split('=');
                searchParams[query[0]] = parseInt(query[1]);
            });
            setInitialValues({
                range: [searchParams.startValue, searchParams.endValue],
                startValue: searchParams.startValue,
                endValue: searchParams.endValue,
                discountOption: `${searchParams.discount}`
            })
        }
        updateSetup(true);
    }, [props.location.search])

    return (
        <Grid container className={classes.filterContainer}>
            <ExpansionPanel className={classes.expansionPanel}>
                <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" align="center">Filter</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container justify="center">
                        <Paper className={classes.paper}>
                            {setup &&
                                <Formik
                                    initialValues={_initialValues}
                                    onSubmit={values => {
                                        console.log(values);
                                        props.history.push(`/categoryView/1?startValue=${values.startValue}&endValue=${values.endValue}&discount=${values.discountOption}`)
                                    }}
                                    onReset={() => { }}
                                >
                                    {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                                        <Form className={classes.form} onSubmit={handleSubmit}>
                                            <Grid container spacing={4}>
                                                <Grid item xs={6}>
                                                    <Grid container className={classes.filter}>
                                                        <Grid item xs={12}>
                                                            <Typography gutterBottom variant="subtitle1" component="span" align="center">
                                                                <span className={classes.bold}>Price Range</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <AirbnbSlider
                                                                marks={marks}
                                                                valueLabelDisplay="auto"
                                                                name="range"
                                                                max={config.rangeDefaults.max}
                                                                ThumbComponent={AirbnbThumbComponent}
                                                                getAriaLabel={index => (index === 0 ? 'Minimum price' : 'Maximum price')}
                                                                defaultValue={[_initialValues.startValue, _initialValues.endValue]}
                                                                onChange={(event, value) => {
                                                                    setFieldValue('range', value);
                                                                    setFieldValue('startValue', value[0]);
                                                                    setFieldValue('endValue', value[1])
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container justify="center" alignItems="center">
                                                                <Grid item xs={4}>
                                                                    <AppInput
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                        name="startValue"
                                                                        type="number"
                                                                        value={values.startValue}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    <Typography gutterBottom variant="h6" component="span" align="center">
                                                                        <span>-</span>
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    <AppInput
                                                                        inputProps={{ style: { textAlign: 'center' } }}
                                                                        name="endValue"
                                                                        type="number"
                                                                        value={values.endValue}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Grid container className={classes.filter}>
                                                        <Grid item xs={12}>
                                                            <Typography gutterBottom variant="subtitle1" component="span" align="center">
                                                                <span className={classes.bold}>Discounts</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container justify="center" alignItems="center">
                                                                <FormControl component="fieldset">
                                                                    <RadioGroup defaultValue={_initialValues.discountOption} name="discountOption"
                                                                        onChange={(event, value) => {
                                                                            setFieldValue('discountOption', value);
                                                                        }}>
                                                                        <FormControlLabel value="75" control={<Radio />} label="More than 75%" />
                                                                        <FormControlLabel value="50" control={<Radio />} label="More than 50%" />
                                                                        <FormControlLabel value="25" control={<Radio />} label="More than 25%" />
                                                                        <FormControlLabel value="10" control={<Radio />} label="More than 10%" />
                                                                        <FormControlLabel value="0" control={<Radio />} label="None" />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={4} justify="flex-end" alignItems="flex-end">
                                                <Grid item xs={6}>
                                                    <AppButton
                                                        fullWidth
                                                        type="submit"
                                                        color="primary"
                                                        content="Apply"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>
                            }
                        </Paper>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Grid>
    )
}

const AirbnbSlider = withStyles({
    root: {
        color: '#3a8589',
        height: 3,
        padding: '13px 0',
    },
    thumb: {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        marginTop: -12,
        marginLeft: -13,
        boxShadow: '#ebebeb 0px 2px 2px',
        '&:focus,&:hover,&$active': {
            boxShadow: '#ccc 0px 2px 3px 1px',
        },
        '& .bar': {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 11px)',
    },
    track: {
        height: 3,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 3,
    },

})(Slider);

const useStyle = makeStyles(theme => ({
    paper: {
        width: '70%',
        paddingTop: '1%',
    },
    form: {
        marginLeft: '10%',
        width: '80%',
    },
    filter: {
        border: '1px solid black',
        borderRadius: '20px',
        padding: '10%',
    },
    filterContainer: {
        zIndex: 2000,
        position: 'inherit',
    },
    expansionPanel: {
        marginTop: '2.5%!important',
        width: '100%'
    },
    expansionPanelSummary: {
        alignItems: 'left',
    },
    bold: {
        fontWeight: 'bold',
    },
}));

export default withRouter(AppFilter);