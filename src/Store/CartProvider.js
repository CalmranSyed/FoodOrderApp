import { useReducer } from "react"
import CartContext from "./cart-context"

const cartItems =  localStorage.getItem('CART_ITEMS') ? JSON.parse(localStorage.getItem('CART_ITEMS')) : []
const cartAmount = cartItems.reduce((acc,item)=>{
  return acc + item.price * item.amount
},0)  

const defaultCartState = {
  items: cartItems,
  totalAmount: cartAmount
}

const cartLocalDBKey = 'CART_ITEMS'

// persist default cart items in local storage
localStorage.setItem(cartLocalDBKey,JSON.stringify(defaultCartState.items))

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]
    let updatedItems

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }

    localStorage.setItem(cartLocalDBKey,JSON.stringify(updatedItems))
    
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
    
  }

  if (action.type==="REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )
    const existingCartItem = state.items[existingCartItemIndex]    
    const updatedTotalAmount = state.totalAmount - existingCartItem.price
    let updatedItems

    if(existingCartItem.amount === 1) {
     updatedItems = state.items.filter(item=> item.id !== action.id) 
    }
    else {
      const updatedItem = {
        ...existingCartItem,
        amount : existingCartItem.amount - 1
      }

      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }

    localStorage.setItem(cartLocalDBKey,JSON.stringify(updatedItems))

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }    
  }

  if(action.type === "CLEAR") {
    localStorage.removeItem(cartLocalDBKey)
    return defaultCartState
  }

  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item })
  }

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id })
  }

  const clearCartHandler = () => {
    dispatchCartAction({type: "CLEAR"})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart : clearCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
