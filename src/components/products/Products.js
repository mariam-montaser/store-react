import React from 'react';
import {Grid} from '@material-ui/core';

import { Product } from './product/Product';
import shose from '../../images/shose.jpg';
import macbook from '../../images/macbook.jpg';
import iphone from '../../images/iphone.jpg';

import useStyles from './styles';

// const products = [
//     {id:1, name: 'shoes', description: 'Running Shoes', price: '$15', image: shose},
//     {id:2, name: 'Macbook', description: 'Apple mackbook', price: '$500', image: macbook},
//     {id:3, name: 'phone', description: 'Smart phone', price: '$250', image: iphone},
// ];

export const Products = ({products, onAddToCart}) => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
                ))}
            </Grid>
        </main>
    )
}
