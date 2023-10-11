import classes from "./Loader.module.css"

const Loader = () => {
  return (
    <div className={classes.loader}>
      <p>Please wait</p>
      <div></div>
    </div>
  )
}

export default Loader
