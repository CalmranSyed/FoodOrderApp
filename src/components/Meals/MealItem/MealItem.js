import React, { useContext } from "react"
import classes from "./MealItem.module.css"
import MealItemForm from "./MealItemForm"
import CartContext from "../../../Store/cart-context"

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`
  const cartCtx = useContext(CartContext)
  const amountSubmitHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount:amount,
      price:props.price
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={classes.description}>{props.desc}</p>
        <p className={classes.price}>{price}</p>
      </div>
      <MealItemForm onSubmitAmount={amountSubmitHandler} id={props.id}/>
    </li>
  )
}

export default MealItem
