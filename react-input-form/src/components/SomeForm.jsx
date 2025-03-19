import { useState } from "react";
import useInput from "../hooks/use-input";


const SomeForm = (props) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const {
    enteredValue: enteredName,
    isInputInvalid: isNameInputInvalid,
    inputChangeHandler: inputNameChangeHandler,
    inputLostFocusHandler: inputNameLostFocusHandler,
    resetInputValue: resetNameInputValue,   
    wasInputTouched: wasNameInputTouched,
  } = useInput(value => value.trim() !== "")

  const {
    enteredValue: enteredSurname,
    isInputInvalid: isSurnameInputInvalid,
    inputChangeHandler: inputSurnameChangeHandler,
    inputLostFocusHandler: inputSurnameLostFocusHandler,
    resetInputValue: resetSurnameInputValue,
    wasInputTouched: wasSurnameInputTouched,
  } = useInput(value => value.trim() !== "")

  const {
    enteredValue: enteredEmail,
    isInputInvalid: isEmailInputInvalid,
    inputChangeHandler: inputEmailChangeHandler,
    inputLostFocusHandler: inputEmailLostFocusHandler,
    resetInputValue: resetEmailInputValue,
    wasInputTouched: wasEmailInputTouched,
  } = useInput(value => value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))


  const isFormInvalid = isNameInputInvalid && isSurnameInputInvalid && isEmailInputInvalid
 

  const formSubmitHandler = (event) => {
    console.log('is submitted')
    event.preventDefault()
    setIsFormSubmitted(true)

    if (isFormInvalid){
      console.log('form is invalid')
      return
    }
    
    resetNameInputValue()
    resetSurnameInputValue()
    resetEmailInputValue()
  }

  const getInputClasses = (isInputInvalid, isFormSubmitted, wasInputTouched) => {
    return (isInputInvalid || (isFormSubmitted && !wasInputTouched)) ?
           "form-control invalid" : "form-control"
  }

  const inputNameClasses = getInputClasses(isNameInputInvalid, isFormSubmitted, wasNameInputTouched)
  const inputSurnameClasses = getInputClasses(isSurnameInputInvalid, isFormSubmitted, wasSurnameInputTouched)
  const inputEmailClasses = getInputClasses(isEmailInputInvalid, isFormSubmitted, wasEmailInputTouched)
                 

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={inputNameClasses}>
          <label htmlFor="name">Enter name</label>
          <input 
                type="text" 
                id="name"
                value={enteredName} 
                onChange={inputNameChangeHandler} 
                onBlur={inputNameLostFocusHandler}               
                />
          {isNameInputInvalid && <p className="error-text">Enter correct name</p> }
          
        </div>
        <div className={inputSurnameClasses}>
          <label htmlFor="surname">Enter surname</label>
          <input 
                type="text" 
                id="surname"
                value={enteredSurname} 
                onChange={inputSurnameChangeHandler} 
                onBlur={inputSurnameLostFocusHandler}               
                 />
          {isSurnameInputInvalid && <p className="error-text">Enter correct surname</p> }
       
        </div>
      </div>
      <div className={inputEmailClasses}>
        <label htmlFor="email">Enter E-Mail</label>
        <input
            type="text" 
            id="email" 
            value={enteredEmail}
            onChange={inputEmailChangeHandler} 
            onBlur={inputEmailLostFocusHandler}          
                />
        {isEmailInputInvalid && <p className="error-text">Enter correct email</p> }
        {}
      </div>
      <div className="form-actions">
        <button onClick={formSubmitHandler}>Send</button>
        {/* {isFormEmpty && <p>Fill out form</p>} */}
      </div>
    </form>
  );
};

export default SomeForm;
