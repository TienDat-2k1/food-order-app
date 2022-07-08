import Header from './Components/Layout/Header';
import React, { useState } from 'react';
import './App.css';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './store/CartProvider';
function App() {
  const [cartIsShow, setCartIsShow] = useState(false);

  const showCartHandler = params => {
    setCartIsShow(true);
  };

  const hideCartHandler = params => {
    setCartIsShow(false);
  };

  return (
    <div className="App">
      <CartProvider>
        {cartIsShow && <Cart onClose={hideCartHandler} />}

        <Header onShowCart={showCartHandler} />

        <main>
          <Meals />
        </main>
      </CartProvider>
    </div>
  );
}

export default App;
