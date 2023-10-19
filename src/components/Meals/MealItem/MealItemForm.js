import React, { useContext, useEffect, useRef, useState } from "react"
import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input"
import CartContext from "../../../Store/cart-context"

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const cart = useContext(CartContext)
  
  const amountInputRef = useRef()
  
  const formSubmitHandler = event => {
    event.preventDefault()
    const enteredAmount = amountInputRef.current.value
    const enteredAmountNumber = +enteredAmount

    if(enteredAmount.trim() === "" || enteredAmountNumber < 1 || enteredAmountNumber > 5 ) {
      setAmountIsValid(false)
      return
    }

    setAmountIsValid(true)
    props.onSubmitAmount(enteredAmountNumber)
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_ "+ props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
      <button type="submit">+ Add</button>
    </form>
  )
}

export default MealItemForm
