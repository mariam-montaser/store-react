import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { Typography, Step, StepLabel, Paper, Stepper, Divider, CircularProgress, Button, CssBaseline } from "@material-ui/core";
import { ConfirmationNumber } from '@material-ui/icons';
import { commerce } from "../../../lib/commerce.js";

import { AddressForm } from "../AddressForm";
import { PaymentForm } from "../PaymentForm";

import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

export const Checkout = ({cart, onCuptureCheckout, order, error}) => {
    console.log(error);
    const classes = useStyles();
    const history = useHistory();
    const [isFinish, setisFinish] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setcheckoutToken] = useState(null);
    const [shippingData, setshippingData] = useState({});

    // console.log(checkoutToken);

    useEffect(() => {
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                // console.log(token);
                setcheckoutToken(token);
            } catch (error) {
                // console.log('Errror: ',error);
                history.push('/');
            }
        }
        generateToken()
    }, [cart]);

    const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
    const backStep = () => setActiveStep((prevStep) => prevStep - 1);

    const next = data => {
        setshippingData(data);
        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            console.log('Hello');
            setisFinish(true);
        }, 3000);
    }

    const Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : isFinish ? (
        <>
            <div>
                <Typography variant="h5">Thank you for purchase.</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if(error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    }

    const Form = () => (
        activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm timeout={timeout} shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCuptureCheckout={onCuptureCheckout} nextStep={nextStep} />
    )
    console.log(checkoutToken);
    return (
        <>
        <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}
