import React from "react"
import classes from "./MealItem.module.css"
import MealItemForm from "./MealItemForm"

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.desc}</p>
        <p className={classes.price}>{price}</p>
      </div>
      <MealItemForm id={props.id}/>
    </li>
  )
}

export default MealItem
