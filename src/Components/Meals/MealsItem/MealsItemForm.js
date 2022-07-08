import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealsItemForm.module.css';

function MealsItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = e => {
    e.preventDefault();

    const enterAmount = amountInputRef.current.value;
    const enterAmountNumber = +enterAmount;

    if (
      enterAmount.trim().length === 0 ||
      enterAmountNumber < 1 ||
      enterAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enterAmountNumber);
  };
  return (
    <form action="" className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
}

export default MealsItemForm;
