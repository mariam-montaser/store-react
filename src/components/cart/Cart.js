import React from 'react';
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from './styles';
import { CartItem } from './cartItem/CartItem';

export const Cart = ({cart, onUpdateCartQty,
onRemoveFromCart, 
onEmptyCart}) => {
    const classes = useStyles();
    let isEmpty;
    if(!cart.line_items) { 
        return 'Loading ...';
    } else { 
        isEmpty = !cart.line_items.length;
    }

    const EmptyCart = () => {
        return (<Typography variant="subtitle1">
            You have no items in your cart start adding some!
            <Link to="/" className={classes.link}>Start Sopping</Link>
        </Typography>)
    }

    const FilledCart = () => {
         return (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map(item => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cartDetails}>
                    <Typography variant="h4">
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={onEmptyCart}>Empty Cart</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
            </div>
        </>
        )
    }

    

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>
                Your Shopping Cart
            </Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}
