import React from 'react';
import classes from './MealsSummary.module.css';

function MealsSummary() {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meals from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home
      </p>
      <p>
        All our meals are cooked with hight-quality ingredient, just-in-time and
        of course by experienced chef
      </p>
    </section>
  );
}

export default MealsSummary;
