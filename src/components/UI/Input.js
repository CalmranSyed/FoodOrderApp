import React from "react"
import classes from "./Input.module.css"

const Input = React.forwardRef((props, ref) => {
  const inputWrapClasses = props.className ? `${props.className} ${classes.input}` : `${classes.input}` 

  return (
    <div className={inputWrapClasses} >
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input}/>
    </div>
  )
})

export default Input
