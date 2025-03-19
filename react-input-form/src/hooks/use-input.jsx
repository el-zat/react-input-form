import { useState, useReducer } from "react"

const initialInputState = {
    inputValue: "",
    wasTouched: false,
}

const inputStateReducer = (state, action) => {
    switch (action.type) {
        case ("INPUT_CHANGE"):
            return {inputValue: action.value, wasTouched: state.wasTouched}
        case ("INPUT_BLUR"):
            return {inputValue: state.inputValue, wasTouched: true}
        case ("RESET_INPUT"):
            return {inputValue: "", wasTouched: false}
    }
    return initialInputState
}

const useInput = (isValueValidFunc) => {
    const [inputState, dispatchAction] = useReducer(inputStateReducer, initialInputState)

    // const [enteredValue, setEnteredValue] = useState("")
    // const [wasInputTouched, setWasInputTouched] = useState(false)

    // const isValueValid = isValueValidFunc(enteredValue) 
    // const isInputInvalid = !isValueValid && wasInputTouched
    const isValueValid = isValueValidFunc(inputState.inputValue) 
    const isInputInvalid = !isValueValid && inputState.wasTouched
    


    const inputChangeHandler = (event)=> {
        dispatchAction({type: "INPUT_CHANGE", value: event.target.value})
        // setEnteredValue(event.target.value)
    }

    const inputLostFocusHandler = (event) => {
        dispatchAction({type: "INPUT_BLUR"})
        // setWasInputTouched(true)
    }

    const resetInputValue = () => {
        dispatchAction({type: "RESET_INPUT"})
        // setEnteredValue("")
        // setWasInputTouched(false)
    }


    return {
        // enteredValue,
        value: inputState.inputValue,
        isInputInvalid,
        inputChangeHandler,
        inputLostFocusHandler,
        resetInputValue,
        // wasInputTouched,
        wasInputTouched: inputState.wasTouched,
    }


} 

export default useInput
