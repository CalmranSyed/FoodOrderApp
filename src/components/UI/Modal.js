import ReactDOM from "react-dom"
import classes from "./Modal.module.css"

const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const Modal = (props) => {
  const portalTarget = document.getElementById("overlays")

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={props.onBackdropClick}/>, portalTarget)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalTarget
      )}
    </>
  )
}

export default Modal
