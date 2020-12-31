import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { commerce } from "./lib/commerce";

import { Products, Navbar, Cart, Checkout } from './components/index';

// import './App.css';

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  // console.log(cart);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data)
  }

  const fetchCart = async () => {
    // const cart = await commerce.cart.retrieve();
    // setCart(cart)
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const {cart} = await commerce.cart.update(productId, {quantity});
    setCart(cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart)
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart)
  }

  const refreshCart = async () => {
    console.log('refresh');
    const newCart = await commerce.cart.refresh();
    console.log(newCart);
    setCart(newCart);

  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    console.log('capture');
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      console.log('incomming order');
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      console.log(error);
      setErrorMsg(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [])

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
             <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} onCuptureCheckout={handleCaptureCheckout} order={order} error={errorMsg} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
