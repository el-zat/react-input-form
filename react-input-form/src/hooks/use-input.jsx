import { useState } from "react"


const useInput = (isValueValidFunc) => {
    const [enteredValue, setEnteredValue] = useState("")
    const [wasInputTouched, setWasInputTouched] = useState(false)

    const isValueValid = isValueValidFunc(enteredValue) 
    const isInputInvalid = !isValueValid && wasInputTouched


    const inputChangeHandler = (event)=> {
        setEnteredValue(event.target.value)
    }

    const inputLostFocusHandler = (event) => {
        setWasInputTouched(true)
    }

    const resetInputValue = () => {
        setEnteredValue("")
        setWasInputTouched(false)
    }


    return {
        enteredValue,
        isInputInvalid,
        inputChangeHandler,
        inputLostFocusHandler,
        resetInputValue,
        wasInputTouched,
    }


} 

export default useInput
