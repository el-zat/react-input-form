import { useState, useRef } from "react";


const SomeInput = (props) => {
  // const nameInputRef = useRef()  not best practice

  const [enteredName, setEnteredName] = useState('')
  const [wasNameInputTouched, setWasNameInputTouched] = useState(false)

  const isEneteredNameValid = (enteredName.trim() !== "")

  const isNameInputInvalid = !isEneteredNameValid && wasNameInputTouched
  const nameInputClasses = isNameInputInvalid ? "form-control invalid" : "form-control"


  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value)
  }


  const formSubmitHandler = (event) => {
    event.preventDefault()
    setWasNameInputTouched(true)
    if (!isEneteredNameValid) {
      return
    }
    console.log(enteredName)
    setEnteredName("")
    setWasNameInputTouched(false)
    // nameInputRef.current.value=''   not best practice
  }


  const nameInputLostFocusHandler = (event) => {
    setWasNameInputTouched(true)
  }

  
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Enter name</label>
        <input 
              type="text" 
              id="name"             
              // ref={nameInputRef}  not best practice
              onChange={nameInputChangeHandler} 
              onBlur={nameInputLostFocusHandler}
              value={enteredName}
              />
        {isNameInputInvalid && <p className="error-text">Enter correct name</p> }
      </div>
      <div className="form-actions">
        <button>Send</button>
      </div>
    </form>
  );
};

export default SomeInput;
