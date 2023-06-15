import React, { useContext } from "react"
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"
import CartContext from "../../Store/cart-context"

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext)

  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{cartCtx.items.length}</span>
    </button>
  )
}

export default HeaderCartButton
