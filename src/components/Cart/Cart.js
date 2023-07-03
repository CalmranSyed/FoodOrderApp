import React, { useContext } from "react"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartContext from "../../Store/cart-context"
import CartItem from "./CartItem"

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const cartTotal = `$${cartCtx.totalAmount.toFixed(2)}`

  const addCartItemHandler = (item) => {
    cartCtx.addItem({...item, amount:1})
  }
  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.key}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addCartItemHandler.bind(null,item)}
          onRemove={removeCartItemHandler.bind(null,item.id)}
        />
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
