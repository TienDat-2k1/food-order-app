import React, { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-contex';
import { useEffect } from 'react';
import { useState } from 'react';

const HeaderCartButton = props => {
  const [btnIsHightLighted, setBtnIsHightLighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const btnClasses = `${classes.button} ${
    btnIsHightLighted ? classes.bump : ''
  }`;

  useEffect(() => {
    if (cartCtx.items.length == 0) {
      return;
    }
    setBtnIsHightLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHightLighted(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  const numberOfCartItems = cartCtx.items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
