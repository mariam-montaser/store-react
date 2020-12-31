import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core";
import {ShoppingCart} from '@material-ui/icons';
import logo from '../../images/logo.png'
import useStyles from './styles';

export const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit" >
                        <img src={logo} alt="commerce.js" height="45px" className={classes.image}/>STORE
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart item" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                    ) }
                    
                </Toolbar>
            </AppBar>
        </>
    )
}
