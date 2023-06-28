import React, { useContext } from "react"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartContext from "../../Store/cart-context"

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const cartTotal = `$${cartCtx.totalAmount}`

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li key={item.key}>{item.name}</li>
      ))}
    </ul>
  )

  return (
    <Modal onBackdropClick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotal}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  )
}

export default Cart
