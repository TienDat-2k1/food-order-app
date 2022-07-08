import { useReducer } from 'react';
import CartContext from './cart-contex';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updateTotalAmount =
      state.totalAmount + action.payload.amount * action.payload.price;

    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.payload.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updateItems;

    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    } else {
      updateItems = { ...action.payload };
      updateItems = state.items.concat(action.payload);
    }

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.payload
    );

    const existingCartItem = state.items[existingCartItemIndex];

    const updateTotalAmount = state.totalAmount - existingCartItem.price;

    let updateItems;

    if (existingCartItem.amount === 1) {
      updateItems = state.items.filter(item => item.id !== action.payload);
    } else {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updateItems = [...state.items];
      updateItems[existingCartItemIndex] = updateItem;
    }

    return {
      items: updateItems,
      totalAmount: updateTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD', payload: item });
  };
  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type: 'REMOVE', payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
