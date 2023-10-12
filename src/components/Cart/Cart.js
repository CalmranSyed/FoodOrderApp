import React, { Fragment, useContext, useState } from "react"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartContext from "../../Store/cart-context"
import CartItem from "./CartItem"
import Checkout from "./Checkout"
import Loader from "../UI/Loader"

const usersUrl =
  "https://react-http-svr-default-rtdb.asia-southeast1.firebasedatabase.app/userdata.json"

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const cartTotal = `$${cartCtx.totalAmount.toFixed(2)}`
  const [isCheckout, setIsCheckout] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState(null)
  const [checkedOut, setCheckedOut] = useState(false)

  const addCartItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }
  const removeCartItemHandler = (id) => {
    cartCtx.removeItem(id)

    if (cartCtx.items.length === 0) {
      setIsCheckout(false)
    }
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const confirmHandler = async (userData) => {
    setIsLoading(true)

    try {
      const response = await fetch(usersUrl, {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedMeals: cartCtx.items,
        }),
      })

      if (!response.ok) {
        throw new Error("Something went wrong :(")
      }
      
      cartCtx.clearCart()
      setIsCheckout(false)
      setCheckedOut(true)
      setIsLoading(false)

    } catch (error) {
      setCheckedOut(true)
      setHttpError(error.message)
      setIsLoading(false)
      console.error(error)
    }
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
      {cartCtx.items.length === 0 && (
        <p className={classes["empty-message"]}>
          Your cart seems empty , please add some delicious meals! :D
        </p>
      )}
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

  const modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{cartTotal}</span>
      </div>
      {isCheckout ? (
        <Checkout
          onConfirm={confirmHandler}
          active={isCheckout}
          onCancel={props.onHideCart}
        />
      ) : (
        cartActions
      )}
    </Fragment>
  )

  const successModalContent = (
    <Fragment>
      <p className={classes["success-message"]}>
        Thanks for ordering, our tasty meals will reach you shortly! :D
      </p>
      <div className={classes.actions}>
        <button className={classes["button"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </Fragment>
  )

  const errorModalContent = (
    <Fragment>
      <p className={classes["error-message"]}>{httpError}</p>
      <div className={classes.actions}>
        <button className={classes["button"]} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </Fragment>
  )

  return (
    <Modal onBackdropClick={props.onHideCart}>
      {isLoading && <Loader />}
      {!checkedOut && !isLoading && modalContent}
      {checkedOut && httpError && errorModalContent}
      {checkedOut && !httpError && successModalContent}
    </Modal>
  )
}

export default Cart
