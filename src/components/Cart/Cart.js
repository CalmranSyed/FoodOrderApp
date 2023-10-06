import React, { useContext, useState } from "react"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartContext from "../../Store/cart-context"
import CartItem from "./CartItem"
import Checkout from "./Checkout"

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const cartTotal = `$${cartCtx.totalAmount.toFixed(2)}`
  const [isCheckout, setIsCheckout] = useState(false)

  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }
  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  )

  const cartActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  )

  return (
    <Modal onBackdropClick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotal}</span>
      </div>
      {isCheckout ? <Checkout active={isCheckout} onCancel={props.onHideCart}/> : cartActions}
    </Modal>
  )
}

export default Cart
