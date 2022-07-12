import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => {
  return value.trim() === '';
};

const isPhoneNumber = value =>
  value.trim().length === 10 && Number.isInteger(Number(value));

// const isFiveChars = value => value.trim().length === 5;

function Checkout(props) {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    phone: true,
    address: true,
  });

  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const addressInputRef = useRef();

  const confirmHandler = e => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredPhoneIsValid = isPhoneNumber(enteredPhone);

    setFormInputValidity({
      name: enteredNameIsValid,
      phone: enteredPhoneIsValid,
      address: enteredAddressIsValid,
    });

    //submit data to server
    props.onConfirm({
      name: enteredName,
      phone: enteredPhone,
      address: enteredAddress,
    });
  };
  console.log(formInputValidity);

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? '' : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputValidity.phone ? '' : classes.invalid
  }`;
  const addressControlClasses = `${classes.control} ${
    formInputValidity.address ? '' : classes.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="phone">Phone Number</label>
        <input type="text" id="phone" ref={phoneInputRef} />
        {!formInputValidity.phone && (
          <p>Please enter a valid phone number (10 numbers)</p>
        )}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputValidity.address && <p>Please enter a valid address</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
