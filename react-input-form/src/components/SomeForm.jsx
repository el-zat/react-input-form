import { useEffect, useState,  } from "react";


const SomeForm = (props) => {
  const [enteredName, setEnteredName] = useState("")
  const [enteredSurname, setEnteredSurname] = useState("")
  const [enteredEmail, setEnteredEmail] = useState("")

  // const [isFormValid, setIsFormValid] = useState(false)

  const [wasNameInputTouched, setWasNameInputTouched] = useState(false)
  const [wasSurnameInputTouched, setWasSurnameInputTouched] = useState(false)
  const [wasEmailInputTouched, setWasEmailInputTouched] = useState(false)

  const isEneteredNameValid = (enteredName.trim() !== "")
  const isEneteredSurnameValid = (enteredSurname.trim() !== "")
  const isEneteredEmailValid = (enteredEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) 


  // const validEnteredData = [isEneteredNameValid, isEneteredNameValid, isEneteredEmailValid]

  const isNameInputEmpty = !isEneteredNameValid && !wasNameInputTouched
  const isSurnameInputEmpty = !isEneteredSurnameValid && !wasSurnameInputTouched
  const isEmailInputEmpty = !isEneteredEmailValid && !wasEmailInputTouched

  const isNameInputInvalid = !isEneteredNameValid && wasNameInputTouched
  const isSurnameInputInvalid = !isEneteredSurnameValid && wasSurnameInputTouched
  const isEmailInputInvalid = !isEneteredEmailValid && wasEmailInputTouched

  // const validInputData = [isNameInputInvalid, isSurnameInputInvalid, isEmailInputInvalid]

  const inputClasses = (isEmailInputInvalid) ? 
                        "form-control invalid" : "form-control"
 
  const isFormInvalid = (isNameInputInvalid && isSurnameInputInvalid && isEmailInputInvalid) 
                        || isNameInputEmpty || isSurnameInputEmpty || isEmailInputEmpty
 
  const inputNameChangeHandler = (event) => {
    setEnteredName(event.target.value)
  }
  const inputSurnameChangeHandler = (event) => {
    setEnteredSurname(event.target.value)
  }
  const inputEmailChangeHandler = (event) => {
    setEnteredEmail(event.target.value)
  }


  const formSubmitHandler = (event) => {
    event.preventDefault()
    setWasNameInputTouched(true)
    setWasSurnameInputTouched(true)
    setWasEmailInputTouched(true)
    if (isFormInvalid){
      console.log('form is invalid')
      return
    }

    setEnteredName("")
    setEnteredSurname("")
    setEnteredEmail("")
    setWasNameInputTouched(false)
    setWasSurnameInputTouched(false)
    setWasEmailInputTouched(false)

    // nameInputRef.current.value=''   not best practice
  }


  const nameInputLostFocusHandler = (event) => {
    setWasNameInputTouched(true)
  }
  const surnameInputLostFocusHandler = (event) => {
    setWasSurnameInputTouched(true)
  }
  const emailInputLostFocusHandler = (event) => {
    setWasEmailInputTouched(true)
  }


  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={inputClasses}>
          <label htmlFor="name">Enter name</label>
          <input 
                type="text" 
                id="name"
                onChange={inputNameChangeHandler} 
                onBlur={nameInputLostFocusHandler}
                value={enteredName} 
                />
          {isNameInputInvalid && <p className="error-text">Enter correct name</p> }
        </div>
        <div className={inputClasses}>
          <label htmlFor="surname">Enter surname</label>
          <input 
                type="text" 
                id="surname"
                onChange={inputSurnameChangeHandler} 
                onBlur={surnameInputLostFocusHandler}
                value={enteredSurname} 
                 />
          {isSurnameInputInvalid && <p className="error-text">Enter correct surname</p> }
        </div>
      </div>
      <div className={inputClasses}>
        <label htmlFor="email">Enter E-Mail</label>
        <input 
            type="text" 
            id="email" 
            onChange={inputEmailChangeHandler} 
            onBlur={emailInputLostFocusHandler}
            value={enteredEmail}
                />
        {isEmailInputInvalid && <p className="error-text">Enter correct email</p> }
      </div>
      <div className="form-actions">
        <button>Отправить</button>
      </div>
    </form>
  );
};

export default SomeForm;
