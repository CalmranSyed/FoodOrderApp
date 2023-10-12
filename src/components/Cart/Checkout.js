import { useRef, useState } from 'react';
import Input from '../UI/Input';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === ""
const hasValidCount = (value,count) => {return value.trim().length === count}
const clearField = (field) => {
  field.current.value = ""
}

const Checkout = (props) => {
  const [fieldValidity,setFieldValidaty] = useState({
    name: true,
    mobile: true,
    street: true,
    postal: true,
    city: true,
  })
  
  const nameRef = useRef()
  const mobileRef = useRef()
  const streetRef = useRef()
  const postalRef = useRef()
  const cityRef = useRef()
  
  const {name, mobile, street, postal, city} = fieldValidity
  
  const confirmHandler = async (event) => {
    event.preventDefault();
    
    const enteredName = nameRef.current.value
    const enteredMobile = mobileRef.current.value
    const enteredStreet = streetRef.current.value
    const enteredPostal = postalRef.current.value
    const enteredCity = cityRef.current.value

    const nameIsValid = !isEmpty(enteredName)
    const mobileIsValid = hasValidCount(enteredMobile,10)
    const postalIsValid = hasValidCount(enteredPostal,5)
    const streetIsValid = !isEmpty(enteredStreet)
    const cityIsValid = !isEmpty(enteredCity)

    setFieldValidaty({
      name: nameIsValid,
      mobile: mobileIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    })

    const formIsValid = nameIsValid && mobileIsValid && postalIsValid && streetIsValid && cityIsValid
    console.log(fieldValidity)

    if(!formIsValid) {
      return
    }

    const userData = {
      name : enteredName,
      mobile: enteredMobile,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    }

    // submit form data
    props.onConfirm(userData)
  };

  const nameCSSClasses = name ? `${classes.control}` : `${classes.control} ${classes.invalid}`
  const mobileCSSClasses = mobile ? `${classes.control}` : `${classes.control} ${classes.invalid}`
  const streetCSSClasses = street ? `${classes.control}` : `${classes.control} ${classes.invalid}`
  const postalCSSClasses = postal ? `${classes.control}` : `${classes.control} ${classes.invalid}`
  const cityCSSClasses = city ? `${classes.control}` : `${classes.control} ${classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <Input className={nameCSSClasses} ref={nameRef} label='Your Name' input={{id:'name', type:'text'}}/>
      {!name && <p>Please enter a valid name</p>}

      <Input className={mobileCSSClasses} ref={mobileRef} label='Mobile No.' input={{id:'mobile', type:'number', min: '1'}}/>
      {!mobile && <p>Please enter a valid mobile no.</p>}
      
      <Input className={streetCSSClasses} ref={streetRef} label='Street name' input={{id:'street', type:'text'}}/>
      {!street && <p>Please enter street name.</p>}
      
      <Input className={postalCSSClasses} ref={postalRef} label='Postal code' input={{id:'postal', type:'text', min: '1'}}/>
      {!postal && <p>Please enter a valid postal code.</p>}
      
      <Input className={cityCSSClasses} ref={cityRef} label='City name' input={{id:'city', type:'text'}}/>
      {!city && <p>Please enter a valid city name.</p>}
      
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
