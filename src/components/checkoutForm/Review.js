import React from 'react';
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

export const Review = ({checkoutToken}) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>Order Summery</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map(item => (
                    <ListItem style={{padding: '10px 0'}} key={item.name}>
                        <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                        <Typography variant="body2">
                            {item.line_total.formatted_with_symbol}
                        </Typography>
                    </ListItem>
                ))}
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{fontWeight: 700}}>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}