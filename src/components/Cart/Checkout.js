import { useRef } from 'react';
import Input from '../UI/Input';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === ""
const hasValidCount = (value,count) => {return value.trim().length === count}

const Checkout = (props) => {
  const nameRef = useRef()
  const mobileRef = useRef()
  const streetRef = useRef()
  const postalRef = useRef()
  const cityRef = useRef()
  
  const confirmHandler = (event) => {
    event.preventDefault();
    
    const name = nameRef.current.value
    const mobile = mobileRef.current.value
    const street = streetRef.current.value
    const postal = postalRef.current.value
    const city = nameRef.current.value

    const nameIsValid = !isEmpty(name)
    const mobileIsValid = hasValidCount(mobile,10)
    const postalIsValid = hasValidCount(postal,5)
    const streetIsValid = !isEmpty(street)
    const cityIsValid = !isEmpty(city)

    const formIsValid = nameIsValid && mobileIsValid && postalIsValid && streetIsValid && cityIsValid
    console.log(formIsValid)
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <Input className={classes.control} ref={nameRef} label='Your Name' input={{id:'name', type:'text'}}/>
      <Input className={classes.control} ref={mobileRef} label='Mobile No.' input={{id:'mobile', type:'number', min: '1'}}/>
      <Input className={classes.control} ref={streetRef} label='Street name' input={{id:'street', type:'text'}}/>
      <Input className={classes.control} ref={postalRef} label='Postal code' input={{id:'postal', type:'text', min: '1'}}/>
      <Input className={classes.control} ref={cityRef} label='City name' input={{id:'city', type:'text'}}/>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
