import React from "react"
import Card from "../UI/Card"
import classes from "./MealsSummary.module.css"

const MealsSummary = () => {
  return (
    <div class={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favourite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked wiht high-quality ingredeints, just-in-time and
        of course by experienced chefs
      </p>
    </div>
  )
}

export default MealsSummary
