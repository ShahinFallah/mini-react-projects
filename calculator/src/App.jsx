import { useReducer } from "react"
import { ACTIONS } from './components/Action'
import DigitButton from "./components/DigitButton";
import OperationButton from './components/OperationButton'

export default function App() {

  function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false
          }
        }
        if (payload.digit === "0" && state.currentOperand === "0") return state
        if (payload.digit === "." && state.currentOperand.includes('.')) return state
        return ({
          ...state,
          currentOperand: `${state.currentOperand || ''}${payload.digit}`
        });

      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOperand == null && state.prevOperand == null) return state

        if (state.currentOperand == null) {
          return {
            ...state,
            operation: payload.operation
          }
        }

        if (state.prevOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            prevOperand: state.currentOperand,
            currentOperand: null
          }
        }

        return {
          ...state,
          prevOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null

        }
      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: null,
            overwrite: false
          }

        }
        if (state.currentOperand == null) return {}

        if (state.currentOperand.length === 1) {
          return {
            ...state,
            currentOperand:null
          }
        }

        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }
      case ACTIONS.CLEAR:
        return {}

      case ACTIONS.EVALUATE:
        if (state.operation == null || state.currentOperand == null || state.prevOperand == null) return state

        return {
          ...state,
          currentOperand: evaluate(state),
          overwrite: true,
          prevOperand: null,
          operation: null
        }
    }
  }

  function evaluate({ currentOperand, prevOperand, operation }) {
    const prev = parseFloat(prevOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""

    switch (operation) {
      case "÷":
        computation = prev / current
        break;
      case "×":
        computation = prev * current
        break;
      case "+":
        computation = prev + current
        break;
      case "-":
        computation = prev - current
        break;
    }
    return computation.toString()
  }

  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits:0
  })

  function formatOperand (operand) {
    if (operand == null) return 

    const [integer, decimal] = operand.split('.')
    if (decimal == null) return INTEGER_FORMATTER.format(integer)

    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`

  }

  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="prev-operand">{formatOperand(prevOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button onClick={() => { dispatch({ type: ACTIONS.CLEAR }) }} className="span-two">AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton dispatch={dispatch} operation='÷' />
      <DigitButton dispatch={dispatch} digit='1' />
      <DigitButton dispatch={dispatch} digit='2' />
      <DigitButton dispatch={dispatch} digit='3' />
      <OperationButton dispatch={dispatch} operation='×' />
      <DigitButton dispatch={dispatch} digit='4' />
      <DigitButton dispatch={dispatch} digit='5' />
      <DigitButton dispatch={dispatch} digit='6' />
      <OperationButton dispatch={dispatch} operation='+' />
      <DigitButton dispatch={dispatch} digit='7' />
      <DigitButton dispatch={dispatch} digit='8' />
      <DigitButton dispatch={dispatch} digit='9' />
      <OperationButton dispatch={dispatch} operation='-' />
      <DigitButton dispatch={dispatch} digit='.' />
      <DigitButton dispatch={dispatch} digit='0' />
      <button onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className="span-two">=</button>
    </div>
  )
}
