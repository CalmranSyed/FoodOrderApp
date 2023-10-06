import React, { useContext, useEffect, useState } from "react"
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"
import CartContext from "../../Store/cart-context"

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext)
  const {items} = cartCtx
  const [btnIsHighlighted,setBtnIsHighlighted] = useState(false)

  const numberOfItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount
  }, 0)

  const btnClasses = `${classes.button}  ${btnIsHighlighted ? classes.bump : ''}`

  useEffect(()=>{
    if(items.length === 0) {
      return
    }
    setBtnIsHighlighted(true)

    const btnAnimationTimer = setTimeout(()=>{
      setBtnIsHighlighted(false)
    },300)
    
    return ()=>{
      clearTimeout(btnAnimationTimer)
    }

  },[items])

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  )
}

export default HeaderCartButton
