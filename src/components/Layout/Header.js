import React from "react"
import classes from "./Header.module.css"
import bannerImg from "../../assets/meals.jpg"
import HeaderCartButton from "./HeaderCartButton"

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h2>MonsieurMeals</h2>
        <HeaderCartButton onClick = {props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={bannerImg} alt="Table full of delicous food" />
      </div>
    </>
  )
}

export default Header
